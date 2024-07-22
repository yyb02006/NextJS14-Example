import { render, screen } from '@testing-library/react'
import HelloLayout from './layout'
import HelloPage from './page'

describe('HelloLayout 테스트', () => {
  it(`'this color is amber' 텍스트가 있어야 한다`, () => {
    // Given
    render(
      <HelloLayout>
        <div />
      </HelloLayout>,
    )

    // When

    // Then
    expect(screen.getByText('this color is amber')).toBeInTheDocument()
  })
})

describe('HelloPage 테스트', () => {
  it(`'Hello HelloPage!' 텍스트가 있어야 한다`, () => {
    // Given
    render(<HelloPage />)

    // When

    // Then
    expect(screen.getByText('Hello HelloPage!')).toBeInTheDocument()
  })
})
