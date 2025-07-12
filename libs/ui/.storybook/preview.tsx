import { Preview } from '@storybook/react-vite'
import { Decorator } from '@storybook/react-vite'
import '../src/styles/global.css'
import { useEffect } from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#0F172B' },
        light: { name: 'Light', value: '#F1F5F9' },
      },
    },

    docs: {
      codePanel: true,
    },
  },
}
export default preview

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
}
export const decorators: Decorator[] = [
  (Story, context) => {
    const theme = context.globals.theme || 'light'
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme)
      return () => {
        document.documentElement.removeAttribute('data-theme')
      }
    }, [theme])
    return <Story />
  },
]
