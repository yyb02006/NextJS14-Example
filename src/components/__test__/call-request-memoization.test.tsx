import { server } from '#/mocks/node'
import { render, screen, waitFor } from '@testing-library/react'
import CallRequestMemoizationComponent from '../call-request-memoization'
import { HttpResponse, http } from 'msw'

const order = 1
const url = 'https://api.thecatapi.com/v1/images/search'

describe('CallRequestMemoizationComponent 테스트', () => {
  beforeAll(() => {
    server.listen()
    // 컴포넌트 내에 fetch 존재
    jest.spyOn(global, 'fetch')
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it(`'${order} 번째 컴포넌트' 텍스트가 있어야 한다`, () => {
    // Given
    render(<CallRequestMemoizationComponent order={order} />)

    // When

    // Then
    expect(screen.getByText('1 번째 컴포넌트')).toBeInTheDocument()
  })

  it(`fetch 함수가 ${url} 파라미터를 전달받아 호출되어야 한다`, async () => {
    // Given
    server.use(
      http.get('https://api.thecatapi.com/v1/images/search', () => {
        return HttpResponse.json([{ url: 'mocked cat url' }])
      }),
    )

    // When
    render(<CallRequestMemoizationComponent order={order} />)

    // Then
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search')
    })
  })
})
