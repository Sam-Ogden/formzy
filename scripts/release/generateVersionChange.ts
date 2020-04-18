// eslint-disable-next-line @typescript-eslint/no-var-requires
const execa = require('execa');

(async function() {
  // Rebase with master
  try {
    // await execa('git', ['checkout', '-b', 'testbranch']);
    // await execa('git', ['rebase', 'origin/master']);
    const { stdout, stdin } = await execa('lerna', ['version']);
    stdin.pipe('n');
    console.log(stdout);
  } catch (err) {
    console.log(err);
  }
})();
