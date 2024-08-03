import { render, screen, waitFor } from '@testing-library/react'
import WorldSlotPage from './page'

jest.mock('#/utils/timeout', () => {
  return {
    timeout: jest.fn(() =>
      Promise.resolve({ comment: 'Worlds were fetched successfully. ( delayed 5 seconds )' }),
    ),
  }
})

describe('WorldSlotPage 테스트', () => {
  describe('초기 상태', () => {
    it(`'wating for fetching...' 텍스트가 있어야 한다`, async () => {
      // Given
      render(<WorldSlotPage />)

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
    it(`'Worlds were fetched successfully. ( delayed 5 seconds )' 텍스트가 있어야 한다`, async () => {
      // Given
      render(<WorldSlotPage />)

      // When
      const textEl = await screen.findByText(
        'Worlds were fetched successfully. ( delayed 5 seconds )',
        undefined,
        { timeout: 1000 },
      )

      // Then
      expect(textEl).toBeInTheDocument()
    })
  })
})
