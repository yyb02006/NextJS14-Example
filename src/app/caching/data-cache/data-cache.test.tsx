import { render, screen } from '@testing-library/react'
import DataCachePage from './page'
import { server } from '#/mocks/node'
import fetchImage from './fetchImage'
import { HttpResponse, http } from 'msw'

jest.mock('../ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url}>{description}</div>
  }
})

jest.mock('./_components/TimerButton', () => {
  return () => <div />
})

jest.mock('./_components/NoStoreCatImage', () => {
  return () => <div />
})

jest.mock('./_components/ForceCacheCatImage', () => {
  return () => <div />
})

jest.mock('./_components/OnDemandRevalidateCatImage', () => {
  return () => <div />
})

beforeAll(() => {
  server.listen()
  jest.spyOn(global, 'fetch')
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(`DataCachePage 테스트`, () => {
  it(`'API URL : https://api.thecatapi.com/v1/images/search' 텍스트가 있어야 한다`, async () => {
    // Given
    const page = await DataCachePage()
    render(page)

    // When

    // Then
    expect(
      screen.getByText('API URL : https://api.thecatapi.com/v1/images/search'),
    ).toBeInTheDocument()
  })

  it(`ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCase = { testId: 'mocked url', description: 'Fetch Revalidated Every 10seconds' }
    const page = await DataCachePage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe(`fetchImage 테스트`, () => {
  it(`고양이 이미지를 성공적으로 가져와야 한다`, async () => {
    // Given
    server.use(
      http.get('https://api.thecatapi.com/v1/images/search', () => {
        return HttpResponse.json([{ url: 'mocked cat url' }])
      }),
    )
    const expectedResponse = [{ url: 'mocked cat url' }]

    // When
    const result = await fetchImage({ kind: 'cat' })

    // Then
    expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search', undefined)
    expect(result).toEqual(expectedResponse)
  })

  it(`강아지 이미지를 성공적으로 가져와야 한다`, async () => {
    // Given
    server.use(
      http.get('https://api.thedogapi.com/v1/images/search', () => {
        return HttpResponse.json([{ url: 'mocked dog url' }])
      }),
    )
    const expectedResponse = [{ url: 'mocked dog url' }]

    // When
    const result = await fetchImage({ kind: 'dog' })

    // Then
    expect(fetch).toHaveBeenCalledWith('https://api.thedogapi.com/v1/images/search', undefined)
    expect(result).toEqual(expectedResponse)
  })

  it(`requestInit이 제공될 경우 fetch에 전달되어야 한다`, async () => {
    // Given
    server.use(
      http.get('https://api.thecatapi.com/v1/images/search', () => {
        return HttpResponse.json([{ url: 'mocked cat url' }])
      }),
    )
    const requestInit = { method: 'GET' }
    const expectedResponse = [{ url: 'mocked cat url' }]

    // When
    const result = await fetchImage({ requestInit, kind: 'cat' })

    // Then
    expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search', requestInit)
    expect(result).toEqual(expectedResponse)
  })
})
