import { server } from '#/mocks/node'
import { render, screen } from '@testing-library/react'
import NonePreFetchingPage from './page'

jest.mock('#/app/caching/ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url}>{description}</div>
  }
})

describe('NonePreFetchingPage 테스트', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it(`'Hello None-Prefetching Page!' 텍스트가 있는 h1 요소가 있어야 한다`, async () => {
    // Given
    const page = await NonePreFetchingPage()
    render(page)

    // When

    // Then
    expect(
      screen.getByRole('heading', { name: 'Hello None-Prefetching Page!' }),
    ).toBeInTheDocument()
  })

  it(`ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCase = {
      testId: 'mocked url',
      description: 'this page invalidating 30 seconds later',
    }
    const page = await NonePreFetchingPage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})
