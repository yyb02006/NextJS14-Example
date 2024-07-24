import { render, screen, waitFor } from '@testing-library/react'
import CatImage from './ServerCatComponent'
import ClientFetchComponent from './ClientCatComponent'
import { server } from '#/mocks/node'

jest.mock('#/app/caching/ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url + description}>{description}</div>
  }
})

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe(`CatImage 테스트`, () => {
  it(`CatImage 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCase = {
      testId: 'mocked url',
      description: 'Server Component Fetch Image',
    }
    const page = await CatImage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId + testCase.description)).toHaveTextContent(
      testCase.description,
    )
  })
})

describe(`ClientFetchComponent 테스트`, () => {
  it(`ClientFetchComponent 컴포넌트에 testCases와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCases = [
      {
        testId: 'mocked url',
        description: 'Client Page Fetch Image',
      },
      {
        testId: 'mocked url',
        description: 'Client Server Action Image',
      },
      {
        testId: 'mocked url',
        description: 'Client Component Fetch Image',
      },
    ]
    render(<ClientFetchComponent />)

    // When

    // Then
    await waitFor(() => {
      testCases.forEach(({ description, testId }) => {
        expect(screen.getByTestId(testId + description)).toHaveTextContent(description)
      })
    })
  })
})
