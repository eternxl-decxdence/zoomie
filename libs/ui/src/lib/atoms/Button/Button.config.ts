import {
  type ButtonSizes,
  type ButtonColor,
  type ButtonVariants,
} from './Button.types'
import { defineStyleMap } from '../../../utlis/defineStyleMap'
import clsx from 'clsx'

const buttonConfig = {
  tokens: {
    colors: [
      'accent',
      'default',
      'success',
      'error',
      'warning',
    ] as ButtonColor[],
    variants: ['solid', 'outline', 'text'] as ButtonVariants[],
    sizes: [
      'xs',
      'sm',
      'base',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
    ] as ButtonSizes[],
  },
  styles: {
    base: 'font-inter w-fit h-fit font-semibold leading-none flex justify-center items-center gap-1 transition-colors duration-300 ease-out',
    sizing: {
      border: {
        ...defineStyleMap(['xs', 'sm'], 'rounded-md'),
        ...defineStyleMap(['base', 'lg', 'xl'], 'rounded-lg'),
        ...defineStyleMap(['2xl', '3xl', '4xl'], 'rounded-xl'),
      },
      default: {
        padding: {
          ...defineStyleMap(['xs', 'sm'], 'px-2 py-1'),
          ...defineStyleMap(['base', 'lg'], 'px-3 py-2'),
          ...defineStyleMap(['xl', '2xl'], 'px-5 py-3'),
          ...defineStyleMap(['3xl', '4xl'], 'px-7 py-4'),
        },
        font: {
          xs: 'text-xs',
          sm: 'text-sm',
          base: 'text-base',
          lg: 'text-lg',
          xl: 'text-xl',
          '2xl': 'text-2xl',
          '3xl': 'text-3xl',
          '4xl': 'text-4xl',
        },
      },
      iconOnly: {
        padding: {
          ...defineStyleMap(['xs', 'sm'], 'px-1 py-1'),
          ...defineStyleMap(['base', 'lg'], 'px-2 py-2'),
          ...defineStyleMap(['xl', '2xl'], 'px-3 py-3'),
          ...defineStyleMap(['3xl', '4xl'], 'px-4 py-4'),
        },
        font: {
          xs: 'w-3',
          sm: 'w-3.5',
          base: 'w-4',
          lg: 'w-4.5',
          xl: 'w-5',
          '2xl': 'w-6',
          '3xl': 'w-7.5',
          '4xl': 'w-9',
        },
      },
    },
    variants: {
      basic: {
        solid: '',
        outline:
          'bg-none outline-2 -outline-offset-2 bg-default-100 dark:bg-default-900',
        text: 'bg-none',
      },
      styled: {
        'solid-accent': 'bg-accent-700 text-accent-50',
        'solid-error': 'bg-error-700 text-error-50',
        'solid-warning': 'bg-warning-700 text-warning-50',
        'solid-success': 'bg-success-700 text-success-50',
        'solid-default': 'bg-default-700 text-default-50',

        'outline-accent': ' text-accent-600 outline-accent-600',
        'outline-error': 'text-error-600 outline-error-600',
        'outline-warning': 'text-warning-600 outline-warning-600',
        'outline-success': 'text-success-600 outline-success-600',
        'outline-default': 'text-default-600 outline-default-600',

        'text-accent':
          'hover:bg-accent-700 hover: hover:text-white text-accent-500',
        'text-error':
          'hover:bg-error-700 hover: hover:text-error-50 text-error-500',
        'text-warning':
          'hover:bg-warning-700 hover:text-warning-50 text-warning-500',
        'text-success':
          'hover:bg-success-700 hover hover:text-success-50 text-success-500',
        'text-default':
          'hover:bg-default-700 hover hover:text-default-50 text-default-500',
      },
    },
    state: {
      disabled: 'bg-default-700 text-default-800 opacity-75',
    },
  },
  logic: {
    getButtonStyles: (
      color: ButtonColor,
      variant: ButtonVariants,
      size: ButtonSizes,
      iconOnly: boolean,
      disabled: boolean
    ) => {
      const styles = buttonConfig.styles
      return clsx(
        styles.base,
        disabled
          ? styles.state.disabled
          : [
              styles.variants.basic[variant],
              styles.variants.styled[`${variant}-${color}`],
            ],
        iconOnly
          ? styles.sizing.iconOnly.padding[size]
          : [
              styles.sizing.default.font[size],
              styles.sizing.default.padding[size],
            ],
        styles.sizing.border[size]
      )
    },
    getIconStyles: (size: ButtonSizes) => {
      const styles = buttonConfig.styles
      return clsx(styles.sizing.iconOnly.font[size])
    },
    getBorderRadius: (size: ButtonSizes) => {
      const styles = buttonConfig.styles
      return clsx(styles.sizing.border[size])
    },
  },
}
export const { getButtonStyles, getIconStyles, getBorderRadius } =
  buttonConfig.logic
export const tokens = buttonConfig.tokens
