

const fs = require("fs");

const files = fs.readdirSync("./assets/images")
  .filter(x => x.includes("png"))
  .filter(x => !x.includes('@2x'))
  .filter(x => !x.includes('@3x'));

const res = files.map(file => `export { default as image${file.split('.png')[0]} } from './${file}';`)
  .join('\n');

fs.writeFileSync("./assets/images/index.js", res);
