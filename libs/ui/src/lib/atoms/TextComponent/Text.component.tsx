import { IText } from './Text.types'
import { forwardRef, createElement } from 'react'
import { TextTag, getTextStyles } from './Text.config'

const TextComponent = forwardRef<HTMLElement, IText>(
  (
    {
      variant = 'paragraph',
      textColor = 'default',
      children,
      size = 'base',
      fontWeight = 'normal',
      level = null,
      ...rest
    },
    ref
  ) => {
    return createElement(
      TextTag(variant, level),
      { className: getTextStyles(), ...rest, ref },
      children
    )
  }
)

TextComponent.displayName = 'Text'

const Header = (
  level: Exclude<IText['level'], 4 | 5 | 6>,
  props: Omit<IText, 'level' | 'variant'>
) => {
  return <TextComponent variant="heading" level={level} {...props} />
}
const Subheader = (
  level: Exclude<IText['level'], 1 | 2 | 3>,
  props: Omit<IText, 'level' | 'variant'>
) => {
  return <TextComponent variant="subheading" level={level} {...props} />
}

const Paragraph = (props: Omit<IText, 'level' | 'variant'>) => {
  return <TextComponent variant="paragraph" {...props} />
}

const Label = (props: Omit<IText, 'level' | 'variant'>) => {
  return <TextComponent variant="label" {...props} />
}

const Line = (props: Omit<IText, 'level' | 'variant'>) => {
  return <TextComponent variant="line" {...props} />
}

Header.displayName = 'Header'
Subheader.displayName = 'Subheader'
Paragraph.displayName = 'Paragraph'
Label.displayName = 'Label'
Line.displayName = 'Line'

export { Header, Subheader, Paragraph, Label, Line }
