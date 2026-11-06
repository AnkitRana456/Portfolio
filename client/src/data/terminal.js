import { portfolioData as data } from './portfolioData.js';

const { personal, skills, projects, experience, education, achievements, socials } = data;

const link = (name) => socials.find((s) => s.name === name).url;

const NEOFETCH = [
  '   ___      ankit@portfolio',
  '  / _ \\     ---------------',
  ' / /_\\ \\    OS: B.Tech CS, MAIT (2027)',
  ' |  _  |    CGPA: 9.20 / 10',
  ' | | | |    Shell: Java, TypeScript, Python',
  ' \\_| |_/    LeetCode: peak 1860',
  `            Host: ${personal.location}`
];

const commands = {
  help: () => ({ lines: [`Available commands: ${Object.keys(commands).filter((c) => c !== 'sudo').join(', ')}`, 'Keys: Tab completes, ArrowUp recalls history.'] }),
  whoami: () => ({ lines: [`${personal.name}, ${personal.title}.`, personal.summary] }),
  neofetch: () => ({ lines: NEOFETCH }),
  skills: () => ({ lines: skills.map((s) => `${s.category}: ${s.items.join(', ')}`) }),
  projects: () => ({ lines: projects.map((p) => `${p.id.padEnd(15)} ${p.tagline}`) }),
  experience: () => ({ lines: experience.map((e) => `${e.role} @ ${e.company} (${e.period})`) }),
  achievements: () => ({ lines: achievements.map((a) => a.title) }),
  education: () => ({ lines: education.map((e) => `${e.institution}: ${e.grade}`) }),
  contact: () => ({ lines: [personal.email, personal.phone, link('LinkedIn')] }),
  social: () => ({ lines: socials.map((s) => `${s.name.padEnd(14)} ${s.url}`) }),
  resume: () => ({ lines: ['Opening resume.pdf...'], action: { type: 'open', url: '/resume.pdf' } }),
  open: (arg) => {
    const project = projects.find((p) => p.id === arg);
    const social = socials.find((s) => s.name.toLowerCase() === arg);
    const url = social?.url || project?.live || project?.github;
    if (url) return { lines: [`Opening ${url}`], action: { type: 'open', url } };
    if (project) return { lines: [`${project.title} is private, so it has no public link.`] };
    return { lines: ['usage: open <project-id | github | linkedin | leetcode | codechef>'] };
  },
  goto: (arg) => data.stages.some((s) => s.id === arg)
    ? { lines: [`Jumping to ${arg}...`], action: { type: 'goto', id: arg } }
    : { lines: [`usage: goto <${data.stages.map((s) => s.id).join(' | ')}>`] },
  theme: (arg) => ['steel', 'mint'].includes(arg)
    ? { lines: [`Theme set to ${arg}.`], action: { type: 'theme', name: arg } }
    : { lines: ['usage: theme <steel | mint>'] },
  clear: () => ({ lines: [], action: { type: 'clear' } }),
  sudo: () => ({ lines: ['ankit is not in the sudoers file. Hiring him might fix that.'] })
};

export const commandNames = Object.keys(commands).filter((c) => c !== 'sudo');

export function runCommand(input) {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return { lines: [] };
  if (!Object.hasOwn(commands, name.toLowerCase())) return { lines: [`zsh: command not found: ${name}. Try 'help'.`] };
  return commands[name.toLowerCase()](args.join(' ').toLowerCase());
}
