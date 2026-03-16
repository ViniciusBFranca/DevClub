import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginImportHelpers from 'eslint-plugin-import-helpers'

export default defineConfig([
  // Regras JS padrão
  {
    ...js.configs.recommended
  },

  // Regras do React recomendadas
  {
    ...pluginReact.configs.flat.recommended
  },

  // Sua configuração customizada vem por algoritimo para sobrescrever o que for necessario
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
      'import-helpers': pluginImportHelpers
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'none',
          arrowParens: 'always',
          semi: false,
          endOfLine: 'auto'
        }
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^@shared/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ]
    }
  }
])