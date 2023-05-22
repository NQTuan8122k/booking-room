module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-extra-boolean-cast': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};

// {
//   "env": {
//     "browser": true,
//     "node": true,
//     "es6": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "eslint-config-prettier",
//     "plugin:react/recommended",
//     "plugin:react-hooks/recommended",
//     "plugin:@typescript-eslint/recommended"
//   ],
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaFeatures": {
//       "jsx": true
//     },
//     "ecmaVersion": 2020,
//     "sourceType": "module"
//   },
//   "plugins": ["react", "react-hooks", "prettier", "@typescript-eslint"],
//   "rules": {
//     "quotes": ["error", "single", { "avoidEscape": true }],
//     "no-extra-boolean-cast": "off",
//     "no-use-before-define": ["error", "nofunc"],
//     "react/no-unescaped-entities": "off",
//     "react-hooks/exhaustive-deps": "off",
//     "react/react-in-jsx-scope": "off",
//     "react/display-name": "off",
//     "@typescript-eslint/no-use-before-define": ["error", "nofunc"],
//     "@typescript-eslint/no-var-requires": "off",
//     "@typescript-eslint/no-explicit-any": "off",

//     // Will be turn into error in the future
//     "react/prop-types": "warn",
//     "no-empty-function": "warn",
//     "@typescript-eslint/no-empty-function": "warn",
//     "@typescript-eslint/ban-ts-comment": "warn",
//     "@typescript-eslint/explicit-module-boundary-types": ["warn"],
//     "no-restricted-imports": [
//       "error",
//       {
//         "paths": [
//           {
//             "name": "react",
//             "importNames": ["lazy"],
//             "message": "Please using withDynamicImport instead."
//           }
//         ]
//       }
//     ]
//   },
//   "overrides": [
//     {
//       "files": ["*.js"],
//       "rules": {
//         "@typescript-eslint/explicit-module-boundary-types": ["off"]
//       }
//     }
//   ],
//   "settings": {
//     "react": {
//       "version": "detect"
//     }
//   }
// }
