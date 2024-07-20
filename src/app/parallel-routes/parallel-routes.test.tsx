import { render, screen } from '@testing-library/react'
import ParallelRoutesPage from './page'
import ParallelRoutesDefault from './default'
import ParallelRoutesLayout from './layout'
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'

jest.mock('#/components/NavButton', () => {
  return ({ label, path }: { label: string; path: string }) => {
    return <div data-testId={label} data-path={path} />
  }
})

jest.mock('next/navigation', () => ({
  useSelectedLayoutSegment: jest.fn(),
  useSelectedLayoutSegments: jest.fn(),
}))

const mockedUseSelectedLayoutSegment = useSelectedLayoutSegment as jest.MockedFunction<
  typeof useSelectedLayoutSegment
>

describe(`ParallelRoutesPage 테스트`, () => {
  it('/page.tsx 텍스트가 있어야 한다', () => {
    // Given
    const { getByText } = render(<ParallelRoutesPage />)

    // When

    // Then
    expect(getByText('/page.tsx')).toBeInTheDocument()
  })
})

describe(`ParallelRoutesDefault 테스트`, () => {
  it('/default.tsx 텍스트가 있어야 한다', () => {
    // Given
    const { getByText } = render(<ParallelRoutesDefault />)

    // When

    // Then
    expect(getByText('/default.tsx')).toBeInTheDocument()
  })
})

describe(`ParallelRoutesLayout 테스트`, () => {
  const renderComponent = ({
    hello = '',
    world = '',
    children = '',
  }: {
    hello?: string
    world?: string
    children?: string
  } = {}) => {
    render(
      <ParallelRoutesLayout hello={<div>{hello}</div>} world={<div>{world}</div>}>
        <div>{children}</div>
      </ParallelRoutesLayout>,
    )
  }

  it(`'Global Nav in Parallel Routes Layout' 텍스트가 있어야 한다`, () => {
    // Given
    renderComponent()

    // When

    // Then
    expect(screen.getByText('Global Nav in Parallel Routes Layout')).toBeInTheDocument()
  })

  it('testCase의 정보에 부합하는 NavButton 요소들이 있어야 한다.', () => {
    // Given
    const testCases = [
      { label: 'to Hello', path: '/parallel-routes/hello' },
      { label: 'to World', path: '/parallel-routes/world' },
      { label: 'to Parent', path: '/parallel-routes' },
    ]
    renderComponent()

    // When

    // Then
    testCases.forEach(({ label, path }) => {
      const testIdEl = screen.getByTestId(label)
      expect(testIdEl).toHaveAttribute('data-path', path)
    })
  })

  it('useSelectedLayoutSegment 함수가 올바른 인수를 전달 받아 호출되어야 한다', () => {
    // Given
    const mockedArguments = ['hello', 'world', undefined]
    renderComponent()

    // When

    // Then
    mockedArguments.forEach((arg) => {
      if (arg) {
        expect(useSelectedLayoutSegment).toHaveBeenCalledWith(arg)
      } else {
        expect(useSelectedLayoutSegment).toHaveBeenCalled()
      }
    })
  })

  it('useSelectedLayoutSegments 함수가 호출되어야 한다', () => {
    // Given
    renderComponent()

    // When

    // Then
    expect(useSelectedLayoutSegments).toHaveBeenCalled()
  })

  it('전달된 요소들이 기본 상태일 때 올바른 클래스가 적용되어야 한다', () => {
    // Given
    mockedUseSelectedLayoutSegment.mockImplementation(() => '__DEFAULT__')
    const testCases = [
      { text: 'Hello', className: 'bg-indigo-800' },
      { text: 'World', className: 'bg-sky-800' },
      { text: 'Children', className: 'bg-pink-800' },
    ]
    renderComponent({ hello: 'Hello', world: 'World', children: 'Children' })

    // When

    // Then
    screen.debug()
    testCases.forEach(({ text, className }) => {
      const testIdEl = screen.getByText(text).parentElement
      expect(testIdEl).toHaveClass(className)
    })
    mockedUseSelectedLayoutSegment.mockReset()
  })

  it('전달된 요소들이 기본 상태가 아닐 때 올바른 클래스가 적용되어야 한다', () => {
    // Given
    const testCases = [
      { text: 'Hello', className: 'bg-indigo-500' },
      { text: 'World', className: 'bg-sky-600' },
      { text: 'Children', className: 'bg-pink-500' },
    ]
    renderComponent({ hello: 'Hello', world: 'World', children: 'Children' })

    // When

    // Then
    testCases.forEach(({ text, className }) => {
      const testIdEl = screen.getByText(text).parentElement
      expect(testIdEl).toHaveClass(className)
    })
  })
})
