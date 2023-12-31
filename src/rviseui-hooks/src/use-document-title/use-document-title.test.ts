import { renderHook } from '@testing-library/react'
import { useDocumentTitle } from './use-document-title'

describe('@rviseui/hooks/use-scroll-lock', () => {
  it('sets given value as document.title', () => {
    renderHook(() => useDocumentTitle('test-title'))
    expect(document.title).toBe('test-title')
  })

  it('does not change document.title if called with empty string', () => {
    document.title = 'test-title'
    renderHook(() => useDocumentTitle(''))
    expect(document.title).toBe('test-title')
    renderHook(() => useDocumentTitle('  \t\n'))
    expect(document.title).toBe('test-title')
  })

  it('trims value before setting to document.title', () => {
    renderHook(() => useDocumentTitle('  test-title\t\n   '))
    expect(document.title).toBe('test-title')
  })
})
