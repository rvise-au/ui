import React from 'react'
import { render } from '@testing-library/react'
import { itSupportsSystemProps, itSupportsInputProps, checkAccessibility, itSupportsFocusEvents } from '@rviseui/tests'
import { Autocomplete, AutocompleteProps } from './Autocomplete'

const defaultProps: AutocompleteProps = {
  withinPortal: false,
  initiallyOpened: true,
  label: 'Test',
  data: [{ value: 'test-1' }, { value: 'test-2' }],
  transitionDuration: 0,
}

const largeDataSet: AutocompleteProps['data'] = Array(50)
  .fill(0)
  .map((_, index) => ({ value: index.toString() }))

const queries = {
  getDropdown: (container: HTMLElement) => container.querySelector('.rviseui-Autocomplete-dropdown'),
  getItems: (container: HTMLElement) => container.querySelectorAll('.rviseui-Autocomplete-item'),
}

describe('@rviseui/core/Autocomplete', () => {
  checkAccessibility([<Autocomplete {...defaultProps} />])
  itSupportsInputProps(Autocomplete, defaultProps, 'Autocomplete')
  itSupportsFocusEvents(Autocomplete, defaultProps, '.rviseui-Autocomplete-input')
  itSupportsSystemProps({
    component: Autocomplete,
    props: defaultProps,
    displayName: '@rviseui/core/Autocomplete',
    refType: HTMLInputElement,
    othersSelector: '.rviseui-Autocomplete-input',
    providerName: 'Autocomplete',
  })

  it('renders dropdown when value has both full match and partial match', () => {
    const { container } = render(
      <Autocomplete {...defaultProps} data={[{ value: 'AAA' }, { value: 'AA' }]} value="AA" />,
    )

    expect(queries.getDropdown(container)).toBeInTheDocument()
  })

  it('renders correct amount of items based on data prop', () => {
    const { container } = render(<Autocomplete {...defaultProps} data={largeDataSet.slice(0, 5)} limit={10} />)

    expect(queries.getItems(container)).toHaveLength(5)
  })

  it('renders correct amount of items based on filter prop', () => {
    const { container } = render(
      <Autocomplete
        {...defaultProps}
        data={largeDataSet}
        limit={10}
        filter={(_query, item) => item.value.includes('2')}
      />,
    )

    // Numbers 0-50 which include 2, e.g. 12, 22, 42
    expect(queries.getItems(container)).toHaveLength(10)
  })

  it('limits amount of shown items based on limit prop', () => {
    const { container } = render(<Autocomplete {...defaultProps} data={largeDataSet} initiallyOpened limit={10} />)
    expect(queries.getItems(container)).toHaveLength(10)
  })
})
