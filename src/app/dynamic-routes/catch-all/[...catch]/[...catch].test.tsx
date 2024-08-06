import { render, screen } from '@testing-library/react'
import CatchAllPage from './page'

describe('Page Component Rendering Test', () => {
  it('올바른 텍스트를 가진 div 요소들이 있어야 한다', () => {
    render(<CatchAllPage params={{ catch: ['n', 'e', 'x', 't'] }} />)
    const parentTextEl = screen.getByText('Current Catch-all Segments = /n/e/x/t', {
      selector: 'div',
    })
    const childTextEl = screen.getByText('Hello CatchAllPage!', { selector: 'div' })
    expect(parentTextEl).toBeInTheDocument()
    expect(childTextEl).toBeInTheDocument()
  })
})
