const { execSync } = require('child_process');
const output = execSync('git log -p -n 5 src/components/SWork.astro').toString();
console.log(output.split('\n').filter(line => line.includes('ctx')).join('\n'));
