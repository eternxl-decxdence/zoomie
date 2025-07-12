import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { StorybookConfig } from '@storybook/react-vite'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    'storybook/actions',
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
}

export default config

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}
