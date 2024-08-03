import { render, screen } from '@testing-library/react'
import FullRouteCachePage from './page'

test(`'Hello FullRouteCachePage!' 텍스트가 포함된 h1 요소가 있어야 한다`, () => {
  // Given
  render(<FullRouteCachePage />)

  // When

  // Then
  expect(screen.getByRole('heading', { name: 'Hello FullRouteCachePage!' })).toBeInTheDocument()
})

test(`'Un-Ordered List 1'부터 'Un-Ordered List 4'까지 4개의 li 요소가 있어야 한다`, () => {
  // Given
  render(<FullRouteCachePage />)

  // When

  // Then
  Array.from({ length: 4 }, (_, index) => {
    expect(
      screen.getByText(`Un-Ordered List ${index + 1}`, { selector: 'ul > li' }),
    ).toBeInTheDocument()
  })
})
