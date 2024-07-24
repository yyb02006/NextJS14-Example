import { render, screen } from '@testing-library/react'
import DynamicRoutePage from './page'

test(`'Hello DynamicRoutePage!' 텍스트가 포함된 h1 요소가 있어야 한다`, () => {
  // Given
  render(<DynamicRoutePage />)

  // When

  // Then
  expect(screen.getByText('Hello DynamicRoutePage!')).toBeInTheDocument()
})
