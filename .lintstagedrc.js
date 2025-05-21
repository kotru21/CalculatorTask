module.exports = {
  '*.js': ['eslint --fix', 'prettier --write'],
  '*.{json,css,md,html}': ['prettier --write'],
};
