import { createStyles, RviseNumberSize, RviseShadow } from '@rviseui/styles'

export interface PaperStylesParams {
  radius: RviseNumberSize
  shadow: RviseShadow
  withBorder: boolean
}

export default createStyles((theme, { radius, shadow, withBorder }: PaperStylesParams) => ({
  root: {
    outline: 0,
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    boxSizing: 'border-box',
    borderRadius: theme.fn.radius(radius),
    boxShadow: theme.shadows[shadow] || shadow || 'none',
    border: withBorder
      ? `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
      : undefined,
  },
}))
