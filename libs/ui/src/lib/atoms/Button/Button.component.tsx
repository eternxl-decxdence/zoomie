import { easeOut, motion, AnimatePresence, easeIn } from 'motion/react'
import { forwardRef, useState } from 'react'
import { IButton } from './Button.types'
import {
  getButtonClassNames,
  getIconSizeClass,
  rippleBorderRadius,
} from './Button.config'
import clsx from 'clsx'
const Button = forwardRef<HTMLButtonElement, IButton>(
  (
    {
      variant = 'solid',
      color = 'accent',
      size = 'base',
      icon,
      label,
      action,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [ripple, setRipple] = useState(false)

    function onClickAnimated() {
      if (!ripple) setRipple(true)
    }

    const isIconOnly = !!icon && !label

    return (
      <div className="p-0 relative w-fit h-fit">
        <motion.button
          key="button"
          ref={ref}
          initial={{ scale: 1, opacity: 1 }}
          disabled={disabled}
          whileTap={
            !disabled
              ? {
                  scale: 0.9,
                  transition: { duration: 0.3, ease: easeOut },
                }
              : undefined
          }
          whileHover={
            !disabled
              ? {
                  scale: 1.05,
                  transition: { duration: 0.2, ease: easeOut },
                }
              : undefined
          }
          className={clsx(
            'z-10 relative',
            getButtonClassNames(color, variant, size, isIconOnly, disabled)
          )}
          onPointerUp={!disabled ? () => onClickAnimated() : undefined}
          {...rest}
        >
          {icon && (
            <div
              className={clsx(
                'text-inherit aspect-square',
                getIconSizeClass(size)
              )}
            >
              {icon}
            </div>
          )}
          {label && label}
        </motion.button>
        <AnimatePresence>
          {ripple && (
            <motion.span
              initial={{
                scale: 1,
                opacity: 1,
              }}
              animate={{
                scaleX: 1.3,
                scaleY: isIconOnly ? 1.3 : 1.6,
                opacity: 0,
                transition: {
                  scaleX: { duration: 0.4, ease: easeIn },
                  scaleY: { duration: 0.4, ease: easeIn },
                  opacity: { duration: 0.6, ease: easeOut },
                },
              }}
              exit={{
                opacity: 0,
              }}
              key="ripple"
              onAnimationComplete={() => {
                setRipple(false)
                action?.()
              }}
              className={clsx(
                'absolute inset-0 z-0 dark:bg-default-50/50 bg-default-700/50 pointer-events-none ',
                rippleBorderRadius(size)
              )}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Button.displayName = 'Button'
export default Button
/* 
                    -------------
                    |   CLICK   |
                    -------------

                    =>

                    -----Ripple------
                    | ------------- |
                    | |   CLICK   | |
                    | ------------- |
                    -----------------

                    =>

                    -------------
                    |   CLICK   |
                    -------------



*/
