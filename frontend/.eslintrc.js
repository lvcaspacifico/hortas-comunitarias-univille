module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  // Use vue-eslint-parser so ESLint understands .vue SFC templates
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // allow console/debug in development
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // temporarily relax rules that block the dev server
    'vue/multi-word-component-names': 'off',
    'vue/no-parsing-error': 'off'
  }
}
