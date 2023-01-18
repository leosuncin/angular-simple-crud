module.exports = {
  '*.{js,ts,tsx,cjs,mjs}': (files) => [
    `nx format:write --files=${files.join(',')}`,
    `nx affected:lint --fix --files=${files
      .map((file) => file.replace(__dirname + '/', ''))
      .join(',')}`,
  ],
  '*.{json,md,css,scss,sass,yaml,yml,html}': (files) => [
    `nx format:write --files=${files.join(',')}`,
  ],
  'package.json': ['sort-package-json'],
};
