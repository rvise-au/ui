import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { checkAccessibility } from '@rviseui/tests'
import { MonthsList, MonthsListProps } from './MonthsList'

const defaultProps: MonthsListProps = {
  amountOfMonths: 1,
  paginateBy: 1,
  month: new Date(2021, 11, 1),
  locale: 'en',
  allowLevelChange: true,
  daysRefs: { current: [[]] } as any,
  onMonthChange: () => {},
  onNextLevel: () => {},
  onDayKeyDown: () => {},
  nextMonthLabel: 'test-next-month',
  previousMonthLabel: 'test-previous-month',
}

describe('@rviseui/dates/MonthsList', () => {
  checkAccessibility([
    <MonthsList {...defaultProps} amountOfMonths={1} />,
    <MonthsList {...defaultProps} amountOfMonths={2} />,
    <MonthsList {...defaultProps} amountOfMonths={3} />,
  ])

  it('calls onNextLevel when level label is clicked', async () => {
    const spy = jest.fn()
    const { container } = render(<MonthsList {...defaultProps} onNextLevel={spy} />)
    await userEvent.click(container.querySelector('.rviseui-MonthsList-calendarHeaderLevel'))
    expect(spy).toHaveBeenCalled()
  })

  it('sets CalendarHeader label based on current selected month and labelFormat', () => {
    render(<MonthsList {...defaultProps} month={new Date(2021, 11, 1)} labelFormat="MMMM YYYY" />)
    expect(screen.getByText('December 2021')).toBeInTheDocument()
  })

  it('calls onMonthChange when next/previous buttons are clicked', async () => {
    const spy = jest.fn()
    render(<MonthsList {...defaultProps} month={new Date(2021, 11, 1)} onMonthChange={spy} />)
    const nextControl = screen.getByLabelText('test-next-month')
    const previousControl = screen.getByLabelText('test-previous-month')
    await userEvent.click(nextControl)
    expect(spy).toHaveBeenLastCalledWith(new Date(2022, 0, 1))
    await userEvent.click(previousControl)
    expect(spy).toHaveBeenLastCalledWith(new Date(2021, 10, 1))
  })

  it('renders correct amount of months', () => {
    const { container: two } = render(<MonthsList {...defaultProps} amountOfMonths={2} />)
    const { container: three } = render(<MonthsList {...defaultProps} amountOfMonths={3} />)
    const { container: four } = render(<MonthsList {...defaultProps} amountOfMonths={4} />)

    expect(two.querySelectorAll('.rviseui-MonthsList-month')).toHaveLength(2)
    expect(three.querySelectorAll('.rviseui-MonthsList-month')).toHaveLength(3)
    expect(four.querySelectorAll('.rviseui-MonthsList-month')).toHaveLength(4)
  })

  it('has correct displayName', () => {
    expect(MonthsList.displayName).toStrictEqual('@rviseui/dates/MonthsList')
  })
})
