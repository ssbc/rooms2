const fs = require('fs');
const path = require('path');
const remark = require('remark');
const behead = require('remark-behead');
const gap = require('remark-heading-gap');
const html = require('remark-html')
const mermaid = require('remark-mermaid')
const toc = require('remark-toc');
const slug = require('remark-slug');
const vfile = require('to-vfile');
const selectAll = require('unist-util-select').selectAll;
const wrap = require('./wrap')

const outputHTML = process.argv.length > 2 && process.argv[2] === "--html"

function collectFiles(list) {
  return () => (tree) => {
    for (const link of selectAll('listItem link', tree)) {
      list.push(link.url);
    }
  };
}

async function* concatenate(...args) {
  const asyncIters =
    args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
  for (const asyncIter of asyncIters) {
    for await (const x of asyncIter) {
      yield x;
    }
  }
}

async function* of(x) {
  yield x;
}

async function toString(asyncIter) {
  let result = '';
  for await (const x of asyncIter) result += x;
  return result;
}

const INPUT_PATH = '../Readme.md'
const OUTPUT_PATH = './'

async function main() {
  const listFiles = [];
  await remark()
    .use(collectFiles(listFiles))
    .process(vfile.readSync(INPUT_PATH));

  const contentsPerFile = listFiles.map((filename) => {
    const filepath = path.join('..', filename).replace(/\%20/g, ' ');
    const asyncIter = fs.createReadStream(filepath, {encoding: 'utf-8'});
    return concatenate(asyncIter, of('\n'));
  });
  const fullContents = await toString(concatenate(contentsPerFile));

  const headerSpacing = {before: 2, after: 1};

  const output = await remark()
    .use(behead, {after: 'Table of contents', depth: 1})
    .use(gap, {1: headerSpacing, 2: headerSpacing, 3: headerSpacing})
    .use(slug)
    .use(mermaid, {simple: true })
    .use(toc, {heading: 'Table of contents', maxDepth: 3, tight: true})
    .use(outputHTML ? html : ()=>{})
    .process(fullContents);

  const revision = new Date().toISOString().slice(0,10)
  const fixRelativeLinks = (match, _, slugMatch) => {
    if (!outputHTML) return match;
    return `href="#${slugMatch.replace(/%20/g, '-').toLowerCase()}"`;
  }

  const stringOutput = String(output)
    .replace(/\#TODO/g, '')
    .replace(/href="([.]{2}[/].*?[/])?(\S*?)\.md"/g, fixRelativeLinks)
    .replace('$REVISION', revision);

  fs.writeFileSync(path.join(OUTPUT_PATH, `rev${revision}${outputHTML ? '.html' : '.md'}`), outputHTML ? wrap(stringOutput) : stringOutput);
}

main();
