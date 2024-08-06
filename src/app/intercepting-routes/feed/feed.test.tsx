import { render, screen } from '@testing-library/react'
import FeedPage from './page'

describe('Page Component Rendering Test', () => {
  it(`'Click to intercept' 텍스트를 가진 Link 요소가 있어야 한다`, () => {
    render(<FeedPage />)
    const textEl = screen.getByText('Click to intercept', { selector: 'a > div' })
    expect(textEl).toBeInTheDocument()
  })
})
