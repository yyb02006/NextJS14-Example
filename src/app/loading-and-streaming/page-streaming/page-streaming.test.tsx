import { render, screen } from '@testing-library/react'
import PageStreamingLoading from './loading'

describe('PageStreamingLoading 테스트', () => {
  it('HTML Stream Loading... 텍스트가 있어야 한다', () => {
    render(<PageStreamingLoading />)
    expect(screen.getByText('HTML Stream Loading...', { selector: 'div' })).toBeInTheDocument()
  })
})
