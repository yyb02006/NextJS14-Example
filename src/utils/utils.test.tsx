import { render, screen } from '@testing-library/react'
import { timeout } from './timeout'

describe('timeout 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('프로미스가 완료된 후 응답객체의 success 프로퍼티가 true여야한다 ', async () => {
    // Given
    const result = await timeout({ success: true, resolveProps: { purpose: 'test' } })

    // When

    // Then
    expect(result.success).toBe(true)
  })
})
