import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button.component.js'

import { generateVariantMatrix } from '../../../utlis/generateVariantMatrix.js'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import {
  buttonColors,
  buttonSizes,
  buttonVariants,
} from './Button.constants.js'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Atoms/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label',
    },
    color: {
      control: 'radio',
      options: [...buttonColors] as string[],
      description: 'Button color',
    },
    variant: {
      control: 'radio',
      options: [...buttonVariants] as string[],
      description: 'Button variant',
    },
    size: {
      control: 'radio',
      options: [...buttonSizes] as string[],
      description: 'Button size bazed on font scale',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const DefaultSolid: Story = {
  args: {
    'aria-label': 'Test Button',
    variant: 'solid',
    label: 'Click me',
    color: 'accent',
  },
}

export const DefaultOutline: Story = {
  args: {
    'aria-label': 'Test Button',
    variant: 'outline',
    icon: (
      <CheckBadgeIcon className="flex justify-center items-center text-inherit w-4 aspect-square" />
    ),
    color: 'accent',
  },
}
export const DefaultText: Story = {
  args: {
    'aria-label': 'Test Button',
    variant: 'text',
    label: 'Click me',
    color: 'accent',
  },
}

export function AllVariant() {
  return generateVariantMatrix({
    component: Button,
    baseProps: {
      'aria-label': 'Test Button',
    },
    variantProps: {
      icon: [undefined, <CheckBadgeIcon />],
      label: [undefined, 'Button'],
      size: buttonSizes,
      variant: buttonVariants,
      color: buttonColors,
    },
    sortOrder: ['color', 'variant'],
    groupBy: 'size',
    filterCombination: (props) => !!props.icon || !!props.label,
  })
}
