import { createStyles, RviseSize } from '@rviseui/styles'

export interface ColorPickerStylesParams {
  size: RviseSize
  fullWidth: boolean
}

export const sizes = {
  xs: 180,
  sm: 200,
  md: 240,
  lg: 280,
  xl: 320,
}

export default createStyles((theme, { size, fullWidth }: ColorPickerStylesParams) => ({
  preview: {},

  wrapper: {
    boxSizing: 'border-box',
    width: fullWidth ? '100%' : theme.fn.size({ size, sizes }),
    padding: 1,
  },

  body: {
    display: 'flex',
    boxSizing: 'border-box',
    paddingTop: theme.fn.size({ size, sizes: theme.spacing }) / 2,
  },

  sliders: {
    flex: 1,
    boxSizing: 'border-box',

    '&:not(:only-child)': {
      marginRight: theme.spacing.xs,
    },
  },

  slider: {
    boxSizing: 'border-box',

    '& + &': {
      marginTop: 5,
    },
  },

  swatch: {
    cursor: 'pointer',
  },
}))
