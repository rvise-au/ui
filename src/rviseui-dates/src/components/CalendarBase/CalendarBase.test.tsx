import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { itSupportsSystemProps, checkAccessibility } from '@rviseui/tests'
import { CalendarBase, CalendarBaseProps } from './CalendarBase'

const labelsProps = {
  nextMonthLabel: 'next month',
  previousMonthLabel: 'previous month',
  nextYearLabel: 'next year',
  previousYearLabel: 'previous year',
  nextDecadeLabel: 'next decade',
  previousDecadeLabel: 'previous decade',
}

const defaultProps: CalendarBaseProps = {}

describe('@rviseui/core/CalendarBase', () => {
  itSupportsSystemProps({
    component: CalendarBase,
    props: defaultProps,
    displayName: '@rviseui/dates/CalendarBase',
    refType: HTMLDivElement,
  })

  checkAccessibility([
    <CalendarBase {...labelsProps} initialLevel="date" />,
    <CalendarBase {...labelsProps} initialLevel="month" />,
    <CalendarBase {...labelsProps} initialLevel="year" />,
  ])

  it('renders correct views based on initialLevel', () => {
    const { container: dateLevel } = render(<CalendarBase initialLevel="date" />)
    const { container: monthLevel } = render(<CalendarBase initialLevel="month" />)
    const { container: yearLevel } = render(<CalendarBase initialLevel="year" />)

    expect(dateLevel.querySelectorAll('.rviseui-CalendarBase-month')).toHaveLength(1)
    expect(dateLevel.querySelectorAll('.rviseui-CalendarBase-monthPicker')).toHaveLength(0)
    expect(dateLevel.querySelectorAll('.rviseui-CalendarBase-yearPicker')).toHaveLength(0)

    expect(monthLevel.querySelectorAll('.rviseui-CalendarBase-month')).toHaveLength(0)
    expect(monthLevel.querySelectorAll('.rviseui-CalendarBase-monthPicker')).toHaveLength(1)
    expect(monthLevel.querySelectorAll('.rviseui-CalendarBase-yearPicker')).toHaveLength(0)

    expect(yearLevel.querySelectorAll('.rviseui-CalendarBase-month')).toHaveLength(0)
    expect(yearLevel.querySelectorAll('.rviseui-CalendarBase-monthPicker')).toHaveLength(0)
    expect(yearLevel.querySelectorAll('.rviseui-CalendarBase-yearPicker')).toHaveLength(1)
  })

  it('calls onMonthChange when month changes', async () => {
    const spy = jest.fn()
    const { container } = render(<CalendarBase onMonthChange={spy} month={new Date(2021, 11, 1)} />)
    await userEvent.click(container.querySelectorAll('.rviseui-CalendarBase-calendarHeaderControl')[0])
    expect(spy).toHaveBeenLastCalledWith(new Date(2021, 10, 1))
    await userEvent.click(container.querySelectorAll('.rviseui-CalendarBase-calendarHeaderControl')[1])
    expect(spy).toHaveBeenLastCalledWith(new Date(2022, 0, 1))
  })
})
