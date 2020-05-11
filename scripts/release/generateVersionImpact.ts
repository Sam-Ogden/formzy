/* eslint-disable @typescript-eslint/no-var-requires */
const execa = require('execa');

export const generateVersionImpact = async function() {
  const { stdout: currBranch } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  const branch = `versionchange-${Math.floor(1000 * Math.random())}`;
  let impact = 'Unable to generate version impact.';
  try {
    await execa('git', ['checkout', '-b', branch]);
    await execa('git', ['rebase', 'origin/master']);
    const { stdout } = await execa('lerna', ['version', '--no-push', '--allow-branch', branch], {
      input: 'n'
    });
    impact = stdout
      .split(' - ')
      .filter((item: string) => item.includes('=>'))
      .map((item: string) => item.split('\n')[0])
      .join('\n');
  } catch (err) {
    console.log(err);
  } finally {
    await execa('git', ['checkout', currBranch]);
  }
  return impact;
};
