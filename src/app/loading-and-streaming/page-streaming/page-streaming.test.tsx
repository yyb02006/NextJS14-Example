import { render, screen, waitFor } from '@testing-library/react'
import ChildComponent from './ChildComponent'

// timeout function 모킹해서 5000 timeout error 관리하기
// children으로 직접 자식 컴포넌트를 받는 테스트 가랑이 사이로 들어가도록 수정

test(`testCases 객체 배열의 정보에 부합하는 list 요소가 있어야 한다`, async () => {
  // Given
  jest.useFakeTimers()
  const testCases = [
    { delaySec: 3, color: 'rose', expectedClass: 'bg-rose-600' },
    { delaySec: 5, color: 'teal', expectedClass: 'bg-teal-600' },
  ]

  // When
  const pagePromise = ChildComponent()
  jest.runAllTimers()
  const page = await pagePromise
  render(page)

  // Then
  testCases.forEach(({ color, delaySec, expectedClass }) => {
    const textEl =
      screen.getByText(`${color[0].toUpperCase() + color.slice(1)}Div was fetched successfully. ( delayed ${delaySec}
      seconds )`)
    expect(textEl).toHaveClass(expectedClass)
  })
})
