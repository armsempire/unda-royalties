const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const versionFile = path.join(__dirname, '../src/version.ts');

const content = `export const VERSION = '${pkg.version}';\n`;
fs.writeFileSync(versionFile, content);
console.log(`src/version.ts aggiornato a versione ${pkg.version}`); 