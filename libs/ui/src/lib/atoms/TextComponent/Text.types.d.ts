import { HTMLAttributes, ReactNode } from 'react'

import {
  textSizes,
  textColors,
  textVariants,
  textWeight,
} from './Text.constants'

export type TextSize = (typeof textSizes)[number]
export type TextWeight = (typeof textWeight)[number]
export type TextColor = (typeof textColors)[number]
export type TextVariant = (typeof textVariants)[number]

export interface IText extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  textColor?: TextColor
  variant?: TextVariant
  size?: TextSize
  fontWeight?: TextWeight
  children?: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6 | null
  italic?: boolean
}

// config types
