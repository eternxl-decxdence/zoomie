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
  size?: string
  label?: string
  color?: ButtonColor
  disabled?: boolean
  variant?: ButtonVariants
  action?: () => void
}
