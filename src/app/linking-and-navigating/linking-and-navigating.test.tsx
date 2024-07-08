import { render, screen } from '@testing-library/react'
import LinkingPage from './page'

describe('Page Component Rendering Test', () => {
  it('올바른 텍스트를 가진 link 요소들이 있어야 한다', () => {
    render(<LinkingPage />)
    const textList = [
      'to Dashboard with Scroll to the Top',
      'to Dashboard with Maintain the Scroll Position',
    ]
    textList.forEach((text) => {
      expect(screen.getByText(text, { selector: 'a' })).toBeInTheDocument()
    })
  })
})
