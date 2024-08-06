import { render, screen } from '@testing-library/react'
import RouteGroupsLayout from './layout'
import { NavButtonProps } from '#/components/NavButton'

jest.mock('#/components/NavButton', () => {
  return function MockNavButton({ label, path }: NavButtonProps) {
    return <li data-testid={path}>{label}</li>
  }
})

describe('RouteGroupsLayout 테스트', () => {
  it(`testCases의 정보에 부합하는 list 요소가 있어야 한다`, () => {
    // Given
    const testCases = [
      { label: 'to Hello', path: '/route-groups/hello' },
      { label: 'to World', path: '/route-groups/world' },
    ]
    render(
      <RouteGroupsLayout>
        <div />
      </RouteGroupsLayout>,
    )

    // When

    // Then
    testCases.forEach(({ label, path }) => {
      expect(screen.getByTestId(path)).toHaveTextContent(label)
    })
  })
})
