import { TextVariant, IText } from './Text.types'
import { JSX } from 'react'

const config = {
  styles: {
    base: '',
    sizing: {},
    variants: {},
    states: {},
  },
  logic: {
    getTextStyles: () => {
      return
    },
    TextTag: (
      variant: TextVariant,
      level: IText['level']
    ): keyof JSX.IntrinsicElements => {
      if ((variant === 'heading' || variant === 'subheading') && level)
        return `h${level}` as const
      if (variant === 'line' || variant === 'label') return 'span'
      return 'p'
    },
  },
}
export const { TextTag, getTextStyles } = config.logic
