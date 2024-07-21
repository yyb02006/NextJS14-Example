import { render, screen, waitFor } from '@testing-library/react'
import HelloSlotPage from './page'
import HelloSlotDefault from './default'

jest.mock('#/utils/timeout', () => {
  return {
    timeout: jest.fn(() =>
      Promise.resolve({ comment: 'Hello was fetched successfully. ( delayed 3 seconds )' }),
    ),
  }
})

describe('HelloSlotDefault 테스트', () => {
  it(`'/@hello/default.tsx' 텍스트가 있어야 한다`, () => {
    // Given
    render(<HelloSlotDefault />)

    // When

    // Then
    expect(screen.getByText('/@hello/default.tsx')).toBeInTheDocument()
  })
})

describe('HelloSlotPage 테스트', () => {
  describe('초기 상태', () => {
    it(`'wating for fetching...' 텍스트가 있어야 한다`, async () => {
      // Given
      render(<HelloSlotPage />)

      // When

      // Then
      await waitFor(
        () => {
          expect(screen.getByText('wating for fetching...')).toBeInTheDocument()
        },
        { timeout: 0 },
      )
    })
  })

  describe('데이터 가져오기 후', () => {
    it(`'Hello was fetched successfully. ( delayed 3 seconds )' 텍스트가 있어야 한다`, async () => {
      // Given
      render(<HelloSlotPage />)

      // When
      const textEl = await screen.findByText(
        'Hello was fetched successfully. ( delayed 3 seconds )',
        undefined,
        { timeout: 4000 },
      )

      // Then
      expect(textEl).toBeInTheDocument()
    })
  })
})
