import { timeout } from './timeout'

describe('timeout 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('프로미스가 완료된 후 응답객체의 success 프로퍼티가 true여야 한다 ', async () => {
    // Given
    const response = timeout({ success: true, resolveProps: {} })

    // When
    jest.runAllTimers()
    const data = await response

    // Then
    expect(data).toHaveProperty('success', true)
  })

  it(`인수로 전달된 testCases의 요소들이 'animal' 프로퍼티로 반환되어야 한다`, async () => {
    // Given
    const testCases = ['dog', 'cat', 'elephant', 'rat']
    const response = Promise.all(
      testCases.map((testCase) => timeout({ success: true, resolveProps: { animal: testCase } })),
    )

    // When
    jest.runAllTimers()
    const data = await response

    // Then
    testCases.forEach((testCase, idx) => {
      expect(testCase).toEqual(data[idx].animal)
    })
  })
})
