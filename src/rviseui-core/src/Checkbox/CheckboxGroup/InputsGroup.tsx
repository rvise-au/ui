import React from 'react'
import { RviseNumberSize } from '@rviseui/styles'
import { Group } from '../../Group/Group'
import { Stack } from '../../Stack/Stack'

interface InputsGroupProps {
  spacing: RviseNumberSize
  offset: RviseNumberSize
  orientation: 'horizontal' | 'vertical'
  role?: string
  children: React.ReactNode
  unstyled?: boolean
}

export function InputsGroup({ spacing, offset, orientation, children, role, unstyled }: InputsGroupProps) {
  if (orientation === 'horizontal') {
    return (
      <Group pt={offset} spacing={spacing} role={role} unstyled={unstyled}>
        {children}
      </Group>
    )
  }

  return (
    <Stack pt={offset} spacing={spacing} role={role} unstyled={unstyled}>
      {children}
    </Stack>
  )
}
