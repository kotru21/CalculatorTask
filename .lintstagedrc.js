module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'jest --findRelatedTests --passWithNoTests'],
  '*.{json,css,md,html}': ['prettier --write'],
};
