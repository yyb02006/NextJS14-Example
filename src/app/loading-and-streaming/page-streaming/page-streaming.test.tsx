import { render, screen, waitFor } from '@testing-library/react'
import ChildComponent from './ChildComponent'

// children으로 직접 자식 컴포넌트를 받는 테스트 가랑이 사이로 들어가도록 수정

function getAllTextContent(element: Element) {
  return Array.from(element.childNodes)
    .map((node) => node.textContent)
    .join('')
}

test(`testCases 객체 배열의 정보에 부합하는 텍스트를 가진 div 요소가 있어야 한다`, async () => {
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
    const textEl = screen.getByText(
      (_, element) => {
        if (!element) return false
        const textContent = getAllTextContent(element)
        return (
          textContent ===
          `${color[0].toUpperCase() + color.slice(1)}Div was fetched successfully. ( delayed ${delaySec}seconds )`
        )
      },
      { selector: 'div' },
    )
    expect(textEl).toHaveClass(expectedClass)
  })
})
