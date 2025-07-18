import { ReactNode } from 'react'
import { buttonVariants, buttonColors, buttonSizes } from './Button.constants'
export type ButtonVariants = (typeof buttonVariants)[number]
export type ButtonColor = (typeof buttonColors)[number]
export type ButtonSizes = (typeof buttonSizes)[number]

export interface IButton
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'className' | 'disabled'
  > {
  icon?: ReactNode
  size?: ButtonSizesq
  label?: string
  color?: ButtonColor
  disabled?: boolean
  variant?: ButtonVariants
  action?: () => void
}

//config types

export type ConfigButtonSizing = {
  border: Record<ButtonSizes, string>
  default: {
    padding: Record<ButtonSizes, string>
    font: Record<ButtonSizes, string>
  }
  iconOnly: {
    padding: Record<ButtonSizes, string>
    font: Record<ButtonSizes, string>
  }
}

export type ConfigButtonVariantsStyles = {
  basic: Record<ButtonVariants, string>
  styled: Record<`${ButtonVariants}-${ButtonColor}`, string>
}

export type ConfigButtonStates = {
  disabled: string
}

export type ConfigButtonLogic = {
  getButtonStyles: (
    color: ButtonColor,
    variant: ButtonVariants,
    size: ButtonSizes,
    iconOnly: boolean,
    disabled: boolean
  ) => string
  getIconStyles: (size: ButtonSizes) => string
  getBorderRadius: (size: ButtonSizes) => string
}
