import { createStyles, CSSObject, RviseTheme } from '@rviseui/styles'
import { GROUP_POSITIONS } from '../../Group/Group.styles'
import { TabsStylesParams, TabsPosition } from '../Tabs.types'

interface TabsListStylesParams extends TabsStylesParams {
  grow: boolean
  position: TabsPosition
}

function getVariantStyles(
  { variant, orientation, inverted, placement }: TabsListStylesParams,
  theme: RviseTheme,
): CSSObject {
  const vertical = orientation === 'vertical'

  if (variant === 'default') {
    return {
      [vertical
        ? placement === 'left'
          ? 'borderRight'
          : 'borderLeft'
        : inverted
        ? 'borderTop'
        : 'borderBottom']: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    }
  }

  if (variant === 'outline') {
    return {
      [vertical
        ? placement === 'left'
          ? 'borderRight'
          : 'borderLeft'
        : inverted
        ? 'borderTop'
        : 'borderBottom']: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    }
  }

  if (variant === 'pills') {
    return {
      gap: `calc(${theme.spacing.sm}px / 2)`,
    }
  }

  return {}
}

export default createStyles((theme, params: TabsListStylesParams) => {
  const vertical = params.orientation === 'vertical'

  return {
    tabsList: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: vertical ? 'column' : 'row',
      justifyContent: GROUP_POSITIONS[params.position],

      '& [role="tab"]': {
        flex: params.grow ? 1 : undefined,
      },

      ...getVariantStyles(params, theme),
    },
  }
})
