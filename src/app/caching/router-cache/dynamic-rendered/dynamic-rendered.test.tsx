import { fireEvent, render, screen } from '@testing-library/react'
import DynamicRenderedPage from './page'
import { server } from '#/mocks/node'
import DynamicRenderedLayout from './layout'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import mockRouter from 'next-router-mock'

jest.mock('../../ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url}>{description}</div>
  }
})

describe('DynamicRenderedPage 테스트', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it(`'Hello Dynamic-Rendered Page!' 텍스트가 있는 h1 요소가 있어야 한다`, async () => {
    // Given
    const page = await DynamicRenderedPage()
    render(page)

    // When

    // Then
    expect(
      screen.getByRole('heading', { name: 'Hello Dynamic-Rendered Page!' }),
    ).toBeInTheDocument()
  })

  it(`ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCase = { testId: 'mocked url', description: 'this page invalidating 5 minutes later' }
    const page = await DynamicRenderedPage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe('DynamicRenderedLayout 테스트', () => {
  const testCases = [
    { href: '/caching/router-cache/dynamic-rendered', text: 'to Prefetching Page' },
    {
      href: '/caching/router-cache/dynamic-rendered/none-prefetching',
      text: 'to None Prefetching Page',
    },
  ]

  it(`testCases의 정보에 부합하는 anchor 요소가 있어야 한다`, () => {
    // Given
    render(
      <DynamicRenderedLayout>
        <div />
      </DynamicRenderedLayout>,
    )

    // When

    // Then
    testCases.forEach(({ href, text }) => {
      expect(screen.getByRole('link', { name: text })).toHaveAttribute('href', href)
    })
  })

  it(`각 링크 클릭 시 올바른 경로로 이동해야 한다`, async () => {
    // Given
    render(
      <DynamicRenderedLayout>
        <div />
      </DynamicRenderedLayout>,
      { wrapper: MemoryRouterProvider },
    )

    // When

    // Then
    for (const { href, text } of testCases) {
      fireEvent.click(screen.getByRole('link', { name: text }))
      expect(mockRouter.asPath).toEqual(href)
    }
  })
})
