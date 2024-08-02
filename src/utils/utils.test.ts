import fetchDelayedColor, { DelayedDivBgColors } from './fetchDelayedColor'
import { mockFunction } from './mockFunction'
import { timeout } from './timeout'

describe('timeout 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('프로미스가 완료된 후 응답객체의 success 프로퍼티가 true여야 한다', async () => {
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

describe('mockFunction 테스트', () => {
  const param = 'mockedArgument'

  it(`'call with'와 '${param}'을 인수로 받는 로그가 호출되어야 한다`, async () => {
    // Given
    const consoleInstance = jest.spyOn(console, 'log')
    mockFunction(param)

    // When

    // Then
    expect(consoleInstance).toHaveBeenCalledWith('call with ', param)
    consoleInstance.mockRestore()
  })
})

describe('fetchDelayedColor 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  const testCases: Array<{ color: DelayedDivBgColors; delaySec: number }> = [
    { color: 'rose', delaySec: 3 },
    { color: 'amber', delaySec: 3 },
    { color: 'fuchsia', delaySec: 3 },
  ]

  it('주어진 색상과 지연 시간에 대해 올바른 결과를 반환해야 한다.', async () => {
    // Given
    const response = testCases.map(({ delaySec, color }) => fetchDelayedColor(delaySec, color))

    // When
    jest.runAllTimers()
    const result = await Promise.all(response)

    // Then
    result.forEach(({ color, delaySec }, idx) => {
      const { color: testColor, delaySec: testDelaySec } = testCases[idx]
      expect(color).toEqual(testColor)
      expect(delaySec).toEqual(testDelaySec)
    })
  })
})
