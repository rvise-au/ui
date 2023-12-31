import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { RangeCalendar, RangeCalendarProps } from './RangeCalendar'

function WrappedRangeCalendar(props: Partial<RangeCalendarProps>) {
  const [value, onChange] = useState<[Date, Date]>([null, null])
  return (
    <div style={{ padding: 40 }}>
      <RangeCalendar value={value} onChange={onChange} {...props} />
    </div>
  )
}

storiesOf('RangeCalendar', module)
  .add('First day of the week sunday', () => <WrappedRangeCalendar firstDayOfWeek="sunday" />)
  .add('2 months', () => <WrappedRangeCalendar amountOfMonths={2} />)
  .add('3 months', () => <WrappedRangeCalendar amountOfMonths={3} paginateBy={1} />)
  .add('Range styles', () => (
    <WrappedRangeCalendar
      month={new Date(2021, 11)}
      styles={(theme) => ({
        day: {
          '&[data-selected]': {
            backgroundColor: `${theme.colors.cyan[4]}`,
            borderRadius: '100px',
            position: 'relative',
          },

          '&[data-in-range]': {
            backgroundColor: `${theme.colors.cyan[0]} !important`,
          },

          '&[data-first-in-range]': {
            backgroundColor: `${theme.colors.cyan[4]} !important`,
            borderRadius: '100px !important',
            position: 'relative',

            '&::after': {
              content: '""',
              backgroundColor: theme.colors.cyan[0],
              position: 'absolute',
              right: -1,
              left: 20,
              top: -1,
              bottom: -1,
              zIndex: -1,
            },
          },

          '&[data-last-in-range]': {
            backgroundColor: `${theme.colors.cyan[4]} !important`,
            borderRadius: '100px !important',
            '&::after': {
              content: '""',
              backgroundColor: theme.colors.cyan[0],
              position: 'absolute',
              left: -1,
              right: 20,
              top: -1,
              bottom: -1,
              zIndex: -1,
            },
          },
        },
      })}
    />
  ))
