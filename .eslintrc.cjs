/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["custom/next"],
};
// TODO: Fix whats breaking with the linter
// module.exports = {
//   extends: ['next/core-web-vitals'],
//   parserOptions: {
//     project: ['./tsconfig.json'],
//     tsconfigRootDir: __dirname,
//   },
// }
