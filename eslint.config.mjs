import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tailwind from 'eslint-plugin-tailwindcss'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],

  {
    name: 'custom/next-react-tailwind-prettier',
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      tailwindcss: tailwind,
      prettier: prettierPlugin
    },

    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    },

    settings: {
      react: { version: 'detect' },
      tailwindcss: { config: './tailwind.config.js' }
    }
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**'])
])
