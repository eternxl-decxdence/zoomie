import {
  ButtonSizes,
  type ButtonColor,
  type ButtonVariants,
} from './Button.types'
import { defineStyleMap } from '../../../utlis/defineStyleMap'
import clsx from 'clsx'

const styles = {
  base: 'font-inter w-fit h-fit font-semibold leading-none flex justify-center items-center gap-1 transition-colors duration-300 ease-out',
  textVariant: 'bg-none',
  outlineVariant:
    'bg-none outline-2 -outline-offset-2 bg-default-100 dark:bg-default-900',
  padding: {
    base: 'px-4 py-2',
    iconOnly: 'px-2 py-2',
  },
  fontSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  },
  iconSize: {
    xs: 'w-3',
    sm: 'w-3.5',
    base: 'w-4',
    lg: 'w-4.5',
    xl: 'w-5',
    '2xl': 'w-6',
    '3xl': 'w-7.5',
    '4xl': 'w-8.5',
  },
  borderRadius: {
    ...defineStyleMap(['xs', 'sm', 'base', 'lg', 'xl'], 'rounded-lg'),
    ...defineStyleMap(['2xl', '3xl', '4xl'], 'rounded-xl'),
  },
}

const variantStyles: Record<`${ButtonVariants}-${ButtonColor}`, string> = {
  // solid
  'solid-accent': 'bg-accent-700 text-accent-50',
  'solid-error': 'bg-error-700 text-error-50',
  'solid-warning': 'bg-warning-700 text-warning-50',
  'solid-success': 'bg-success-700 text-success-50',
  'solid-default': 'bg-default-700 text-default-50',
  // outline
  'outline-accent': `${styles.outlineVariant} text-accent-600 outline-accent-600`,
  'outline-error': `${styles.outlineVariant} text-error-600 outline-error-600`,
  'outline-warning': `${styles.outlineVariant} text-warning-600 outline-warning-600`,
  'outline-success': `${styles.outlineVariant} text-success-600 outline-success-600`,
  'outline-default': `${styles.outlineVariant} text-default-600 outline-default-600`,

  // text
  'text-accent': `${styles.textVariant} hover:bg-accent-700 hover: hover:text-white text-accent-500 `,
  'text-error': `${styles.textVariant} hover:bg-error-700 hover: hover:text-error-50 text-error-500`,
  'text-warning': `${styles.textVariant} hover:bg-warning-700 hover:text-warning-50 text-warning-500`,
  'text-success': `${styles.textVariant} hover:bg-success-700 hover hover:text-success-50 text-success-500`,
  'text-default': `${styles.textVariant} hover:bg-default-700 hover hover:text-default-50 text-default-500`,
}

const disabledStyles = 'bg-default-700 text-default-800 opacity-75'

export function getButtonClassNames(
  color: ButtonColor,
  variant: ButtonVariants,
  size: ButtonSizes,
  iconOnly: boolean,
  disabled: boolean
) {
  return clsx(
    styles.base,
    styles.fontSize[size],
    styles.borderRadius[size],
    iconOnly ? styles.padding.iconOnly : styles.padding.base,
    disabled ? disabledStyles : variantStyles[`${variant}-${color}`]
  )
}
export function getIconSizeClass(size: ButtonSizes) {
  return styles.iconSize[size]
}
export function rippleBorderRadius(size: ButtonSizes) {
  return styles.borderRadius[size]
}
