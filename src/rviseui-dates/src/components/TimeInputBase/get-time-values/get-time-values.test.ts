import { getTimeValues } from './get-time-value'

describe('@rviseui/dates/get-time-value', () => {
  it('returns correct time values', () => {
    expect(getTimeValues(new Date(2021, 7, 21, 1, 23, 44), '24', 'am', 'pm')).toStrictEqual({
      hours: '01',
      minutes: '23',
      seconds: '44',
      amPm: 'am',
    })
  })
})
