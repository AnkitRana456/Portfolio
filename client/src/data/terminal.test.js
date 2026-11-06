import test from 'node:test';
import assert from 'node:assert/strict';
import { runCommand, commandNames } from './terminal.js';

test('every listed command runs without arguments', () => {
  for (const name of commandNames) assert.ok(Array.isArray(runCommand(name).lines), name);
});

test('blank input and unknown commands are safe', () => {
  assert.deepEqual(runCommand('   ').lines, []);
  assert.match(runCommand('rm -rf').lines[0], /command not found/);
  assert.match(runCommand('constructor').lines[0], /command not found/);
});

test('commands are case-insensitive and validate arguments', () => {
  assert.equal(runCommand('THEME Mint').action.name, 'mint');
  assert.equal(runCommand('theme neon').action, undefined);
  assert.equal(runCommand('goto skills').action.id, 'skills');
  assert.equal(runCommand('goto nowhere').action, undefined);
});

test('open resolves public links and reports private projects', () => {
  assert.match(runCommand('open quickstay').action.url, /vercel\.app/);
  assert.equal(runCommand('open assetflow-erp').action.url, 'https://github.com/AnkitRana456/AssetFlow-ERP');
  assert.equal(runCommand('open propbot-pro').action, undefined);
});
