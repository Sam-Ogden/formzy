import { markdown } from 'danger';

import { generateVersionImpact } from './release/generateVersionImpact';

async function getImpact() {
  const impact = await generateVersionImpact();
  return `
## Version Impact Against Master  
${impact}
`;
}

const main = async () => {
  markdown(await getImpact());
};

main();
