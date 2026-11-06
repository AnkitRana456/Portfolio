// Snapshots LeetCode + GitHub activity at build time, so the live site never depends on a third-party API.
import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/activity.json', import.meta.url);
const LEETCODE_USER = 'Ankit_010804';
const GITHUB_USER = 'AnkitRana456';
const DAY = 86400000;

async function leetcode(query) {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(20000)
  });
  if (!res.ok) throw new Error(`LeetCode ${res.status}`);
  return (await res.json()).data;
}

const calendarQuery = (year) => `{ matchedUser(username:"${LEETCODE_USER}"){ userCalendar(year:${year}){ streak submissionCalendar } } }`;

async function main() {
  const year = new Date().getUTCFullYear();
  const [now, prev, profile, github] = await Promise.all([
    leetcode(calendarQuery(year)),
    leetcode(calendarQuery(year - 1)),
    leetcode(`{ matchedUser(username:"${LEETCODE_USER}"){ submitStats{ acSubmissionNum{ difficulty count } } } userContestRanking(username:"${LEETCODE_USER}"){ rating attendedContestsCount topPercentage } }`),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, { signal: AbortSignal.timeout(20000) }).then((r) => {
      if (!r.ok) throw new Error(`GitHub contributions ${r.status}`);
      return r.json();
    })
  ]);

  const calendars = [now, prev].map((d) => d.matchedUser.userCalendar);
  const leetDays = {};
  for (const { submissionCalendar } of calendars) {
    for (const [ts, count] of Object.entries(JSON.parse(submissionCalendar))) {
      const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
      leetDays[date] = (leetDays[date] || 0) + count;
    }
  }
  const gitDays = Object.fromEntries(github.contributions.map((c) => [c.date, c.count]));

  const today = Date.parse(new Date().toISOString().slice(0, 10));
  const days = [];
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today - i * DAY).toISOString().slice(0, 10);
    days.push({ date, leetcode: leetDays[date] || 0, github: gitDays[date] || 0 });
  }

  const solved = Object.fromEntries(profile.matchedUser.submitStats.acSubmissionNum.map((s) => [s.difficulty, s.count]));
  const contest = profile.userContestRanking;
  const stats = {
    solved: solved.All,
    easy: solved.Easy,
    medium: solved.Medium,
    hard: solved.Hard,
    contests: contest.attendedContestsCount,
    topPercent: contest.topPercentage,
    maxStreak: Math.max(...calendars.map((c) => c.streak))
  };

  await writeFile(OUT, `${JSON.stringify({ generatedAt: new Date(today).toISOString().slice(0, 10), stats, days })}\n`);
  console.log(`activity.json updated: ${stats.solved} solved, ${days.filter((d) => d.leetcode || d.github).length} active days`);
}

main().catch(async (err) => {
  // Keep the last good snapshot so a flaky API never fails a deploy.
  await readFile(OUT).catch(() => { throw err; });
  console.warn(`activity.json kept (refresh failed: ${err.message})`);
});
