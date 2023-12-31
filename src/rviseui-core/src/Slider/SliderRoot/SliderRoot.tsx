import React, { forwardRef } from 'react'
import { RviseNumberSize, DefaultProps, Selectors } from '@rviseui/styles'
import { Box } from '../../Box'
import useStyles from './SliderRoot.styles'

export type SliderRootStylesNames = Selectors<typeof useStyles>

export interface SliderRootProps extends DefaultProps<SliderRootStylesNames>, React.ComponentPropsWithoutRef<'div'> {
  size: RviseNumberSize
  children: React.ReactNode
  disabled: boolean
}

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(
  ({ className, size, classNames, styles, disabled, unstyled, ...others }: SliderRootProps, ref) => {
    const { classes, cx } = useStyles({ size, disabled }, { classNames, styles, unstyled, name: 'Slider' })
    return <Box {...others} tabIndex={-1} className={cx(classes.root, className)} ref={ref} />
  },
)

SliderRoot.displayName = '@rviseui/core/SliderRoot'
