import React from 'react'
import { itSupportsSystemProps, checkAccessibility, patchConsoleError } from '@rviseui/tests'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip, TooltipProps } from './Tooltip'
import { TooltipFloating } from './TooltipFloating/TooltipFloating'
import { TooltipGroup } from './TooltipGroup/TooltipGroup'
import { TOOLTIP_ERRORS } from './Tooltip.errors'

const defaultProps: TooltipProps = {
  withinPortal: false,
  opened: true,
  transitionDuration: 0,
  label: 'test-tooltip',
  children: <button type="button">test-target</button>,
}

describe('@rviseui/core/Tooltip', () => {
  checkAccessibility([<Tooltip {...defaultProps} />])
  itSupportsSystemProps({
    component: Tooltip,
    props: defaultProps,
    displayName: '@rviseui/core/Tooltip',
    providerName: 'Tooltip',
  })

  it('throws error if children cannot be processed', () => {
    const TestTooltip: any = Tooltip
    const error = new Error(TOOLTIP_ERRORS.children)
    patchConsoleError()
    expect(() => render(<TestTooltip>Hello</TestTooltip>)).toThrow(error)
    expect(() => render(<TestTooltip>{2}</TestTooltip>)).toThrow(error)
    expect(() =>
      render(
        <TestTooltip>
          <>fragment</>
        </TestTooltip>,
      ),
    ).toThrow(error)
    expect(() =>
      render(
        <TestTooltip>
          <div>node 1</div>
          <div>node 2</div>
        </TestTooltip>,
      ),
    ).toThrow(error)
    patchConsoleError.release()
  })

  it('allows to get child ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(
      <Tooltip label="tooltip" opened>
        <button type="button" ref={ref}>
          target
        </button>
      </Tooltip>,
    )
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('shows tooltip when target element is hovered', async () => {
    render(
      <Tooltip label="test-tooltip" transitionDuration={0}>
        <button type="button">target</button>
      </Tooltip>,
    )

    await userEvent.hover(screen.getByRole('button'))
    expect(screen.getByText('test-tooltip')).toBeInTheDocument()

    await userEvent.unhover(screen.getByRole('button'))
    expect(screen.queryAllByText('test-tooltip')).toHaveLength(0)
  })

  it('exposes TooltipGroup and TooltipFloating as static properties', () => {
    expect(Tooltip.Floating).toBe(TooltipFloating)
    expect(Tooltip.Group).toBe(TooltipGroup)
  })
})
