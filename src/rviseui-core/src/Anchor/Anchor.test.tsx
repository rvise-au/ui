import React from 'react'
import { render } from '@testing-library/react'
import { itRendersChildren, itIsPolymorphic, itSupportsSystemProps } from '@rviseui/tests'
import { Anchor, AnchorProps } from './Anchor'

const defaultProps: AnchorProps = {}

describe('@rviseui/core/Anchor', () => {
  itRendersChildren(Anchor, defaultProps)
  itIsPolymorphic(Anchor, defaultProps)
  itSupportsSystemProps({
    component: Anchor,
    props: defaultProps,
    displayName: '@rviseui/core/Anchor',
    refType: HTMLAnchorElement,
    providerName: 'Anchor',
  })

  it('adds type="button" attribute if component prop is button', () => {
    const { container: link } = render(<Anchor component="a" />)
    const { container: button } = render(<Anchor component="button" />)
    const { container: buttonReset } = render(<Anchor component="button" type="reset" />)

    expect(link.querySelector('a').getAttribute('type')).toBe(null)
    expect(button.querySelector('button').getAttribute('type')).toBe('button')
    expect(buttonReset.querySelector('button').getAttribute('type')).toBe('reset')
  })
})
