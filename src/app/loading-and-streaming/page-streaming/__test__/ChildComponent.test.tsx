import { screen, render } from '@testing-library/react'
import ChildComponent from '../components/ChildComponent'

jest.mock('../components/DelayedDiv', () => {
  return ({ color, delaySec }: { color: string; delaySec: number }) => {
    return <div data-testId={`${color}${delaySec}`} />
  }
})

describe('ChildComponent 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it(`각 testCase의 텍스트와 클래스가 올바르게 설정되어야 한다`, async () => {
    // Given
    const testCases = [
      { delaySec: 3, color: 'rose' },
      { delaySec: 5, color: 'teal' },
    ]
    const pagePromise = ChildComponent()
    jest.runAllTimers()
    const page = await pagePromise

    // When
    render(page)

    // Then
    screen.debug()
    testCases.forEach(({ color, delaySec }) => {
      const textEl = screen.getByTestId(`${color}${delaySec}`)
      expect(textEl).toBeInTheDocument()
    })
  })
})
