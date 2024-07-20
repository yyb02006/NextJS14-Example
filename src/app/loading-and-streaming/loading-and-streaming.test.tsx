import { render, screen } from '@testing-library/react'
import LoadingAndStreamingLayout from './layout'
import { NavButtonProps } from '#/components/NavButton'

jest.mock('#/components/NavButton', () => {
  return function MockNavButton({ label, path }: NavButtonProps) {
    return <li data-testid={path}>{label}</li>
  }
})

test(`'Global Nav in Parent Segment Layout'텍스트를 가진 div 요소가 있어야 한다`, () => {
  // Given

  // When
  render(<LoadingAndStreamingLayout children={<div />} />)

  // Then
  screen.debug()
  const textEl = screen.getByText('Global Nav in Parent Segment Layout', { selector: 'div' })
  expect(textEl).toBeInTheDocument()
})

test(`navList의 정보에 부합하는 list 요소가 있어야 한다`, () => {
  // Given
  const navList = [
    { label: 'to Home', path: '/' },
    { label: 'to Dashboard', path: '/dashboard' },
    { label: 'to Linking', path: '/linking' },
  ]

  // When
  render(<LoadingAndStreamingLayout children={<div />} />)

  // Then
  navList.forEach(({ label, path }) => {
    expect(screen.getByTestId(path)).toHaveTextContent(label)
  })
})
