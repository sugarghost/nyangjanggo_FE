module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'linebreak-style': 0,
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'array-callback-return': 0,
    'global-require': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    // 이미지 이벤트 처리에 대한 경고들, 일단 비활성화 시킴
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-empty-pattern': 0,
    'no-alert': 0,
    'no-unused-vars': 'off',
    'no-return-assign': 0,
    'no-nested-ternary': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    // ts-ignore 사용에 대한 경로로 일단 비활성화
    '@typescript-eslint/ban-ts-comment': 0,
    'react/jsx-props-no-spreading': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prop-types': 0,
    'react/require-default-props': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/button-has-type': 0,
    'react/no-array-index-key': 0,
    'react-hooks/exhaustive-deps': 0,
    // 빈 <> 태그 사용에 관련된 룰
    'react/jsx-no-useless-fragment': 0,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/extensions': ['error'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'object-curly-newline': 0,
    'jsx-a11y/label-has-associated-control': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@type', './src/type'],
        ],
      },
    },
  },
};
