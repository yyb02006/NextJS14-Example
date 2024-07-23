import { getByText, render, screen, waitFor } from '@testing-library/react'
import CachingLayout from './layout'
import CachingPage from './page'
import userEvent from '@testing-library/user-event'
import { server } from '#/mocks/node'

jest.mock('#/components/NavButton', () => {
  return function MockNavButton({ label, path }: { label: string; path: string }) {
    return <li data-testid={path}>{label}</li>
  }
})

jest.mock('#/components/call-request-memoization', () => {
  return ({ order }: { order: number }) => <div data-testid={order} />
})

userEvent.setup()

describe('CachingLayout 테스트', () => {
  it(`'Global Nav in Parent Segment Layout'텍스트가 있어야 한다`, () => {
    // Given
    render(
      <CachingLayout>
        <div />
      </CachingLayout>,
    )

    // When

    // Then
    const testEl = screen.getByText('Global Nav in Parent Segment Layout')
    expect(testEl).toBeInTheDocument()
  })

  it('testCases의 정보에 부합하는 list 요소가 있어야 한다', () => {
    // Given
    const testCases = [
      { label: 'to Request Memoization', path: '/caching/req-memo' },
      { label: 'to Data Cache', path: '/caching/data-cache' },
      { label: 'to Router Cache', path: '/caching/router-cache' },
      { label: 'to Full Route Cache', path: '/caching/full-route-cache' },
    ]
    render(
      <CachingLayout>
        <div />
      </CachingLayout>,
    )

    // When

    // Then
    testCases.forEach(({ label, path }) => {
      expect(screen.getByTestId(path)).toHaveTextContent(label)
    })
  })
})

describe('CachingPage 테스트', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  it('testCases의 정보에 부합하는 list 요소가 있어야 한다', () => {
    // Given
    const testCases = ['Request Memoization', 'Data Cache', 'Router Cache', 'Full Route Cache']
    render(<CachingPage />)

    // When

    // Then
    testCases.forEach((testCase) => {
      expect(screen.getByText(testCase, { selector: 'li' })).toBeInTheDocument()
    })
  })

  it(`'Request Memoization' 버튼을 클릭한 후 1에서 5까지의 testId를 가진 요소가 있어야 한다`, async () => {
    // Given
    render(<CachingPage />)
    Array.from({ length: 5 }, (_, index) => {
      expect(screen.queryByTestId(index)).not.toBeInTheDocument()
    })
    const button = screen.getByText('Request Memoization')

    // When
    userEvent.click(button)

    // Then
    await waitFor(() => {
      Array.from({ length: 5 }, (_, index) => {
        expect(screen.queryByTestId(String(index))).toBeInTheDocument()
      })
    })
  })
})
