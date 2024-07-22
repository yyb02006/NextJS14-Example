import { render, screen } from '@testing-library/react'
import WorldLayout from './layout'
import WorldPage from './page'

describe('WorldLayout 테스트', () => {
  it(`'this color is pink' 텍스트가 있어야 한다`, () => {
    // Given
    render(
      <WorldLayout>
        <div />
      </WorldLayout>,
    )

    // When

    // Then
    expect(screen.getByText('this color is pink')).toBeInTheDocument()
  })
})

describe('WorldPage 테스트', () => {
  it(`'Hello WorldPage!' 텍스트가 있어야 한다`, () => {
    // Given
    render(<WorldPage />)

    // When

    // Then
    expect(screen.getByText('Hello WorldPage!')).toBeInTheDocument()
  })
})
