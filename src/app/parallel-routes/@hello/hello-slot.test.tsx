import { render, screen } from '@testing-library/react'
import HelloSlotPage from './page'

jest.mock('#/utils/timeout', () => {
  return {
    timeout: jest.fn(() => ({
      comment: 'Hello was fetched successfully. ( delayed 3 seconds )',
    })),
  }
})

describe('HelloSlotPage 테스트', () => {
  it(`'Global Nav in Parent Segment Layout'텍스트를 가진 div 요소가 있어야 한다`, async () => {
    render(<HelloSlotPage />)
    const textEl = await screen.findByText(
      'Hello was fetched successfully. ( delayed 3 seconds )',
      undefined,
      { timeout: 4000 },
    )
    expect(textEl).toBeInTheDocument()
  })
})
