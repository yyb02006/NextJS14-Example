import { render, screen } from '@testing-library/react'
import PreFetchingPage from './page'
import { server } from '#/mocks/node'

jest.mock('../../ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url}>{description}</div>
  }
})

describe('PrefetchingPage 테스트', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it(`'Hello Dynamic-Rendered Page!' 텍스트가 있는 h1 요소가 있어야 한다`, async () => {
    // Given
    const page = await PreFetchingPage()
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
    const page = await PreFetchingPage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})
