#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');
const datamail = require('../lib');

let inputFile;

program
  .version(pkg.version)
  .description('Data-driven emails engine');

program
  .arguments('<file>')
  .action(file => {
    inputFile = file;
  });

program.parse(process.argv);

if (typeof inputFile === 'undefined') {
  console.error('No input file provided');
  process.exit(1);
}

const replaceExtension = input => input.replace(/\.liquid$/, '.html');

fs.readFile(inputFile, 'utf8', async (err, data) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  const liquid = {
    root: path.dirname(inputFile)
  }

  const html = await datamail(data, { mjml: true, liquid });

  fs.writeFileSync(replaceExtension(inputFile), html);
});
