import { render, screen, waitFor } from '@testing-library/react'
import ClientComponentFetch from './FetchingFromClient'
import ServerComponentFetch from './FetchingFromServer'
import { server } from '#/mocks/node'
import RouteHandlerRequestPage from './page'

jest.mock('./FetchingFromClient', () => {
  return jest.fn(() => <div />)
})

jest.mock('./FetchingFromServer', () => {
  return jest.fn(() => <div />)
})

jest.mock('#/utils/timeout', () => {
  return { timeout: jest.fn(() => Promise.resolve({ time: 20110322 })) }
})

const mocked = {
  ClientComponentFetch: ClientComponentFetch as jest.MockedFunction<typeof ClientComponentFetch>,
  ServerComponentFetch: ServerComponentFetch as jest.MockedFunction<typeof ServerComponentFetch>,
}

const originals = {
  ClientComponentFetch:
    jest.requireActual<typeof import('./FetchingFromClient')>('./FetchingFromClient').default,
  ServerComponentFetch:
    jest.requireActual<typeof import('./FetchingFromServer')>('./FetchingFromServer').default,
}

describe('ClientComponentFetch 테스트', () => {
  beforeAll(() => {
    mocked.ClientComponentFetch.mockImplementation(originals.ClientComponentFetch)
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
    mocked.ClientComponentFetch.mockRestore()
  })
  it(`데이터 가져오기가 완료된 후 '20201125' 텍스트가 있어야 한다`, async () => {
    // Given
    render(<ClientComponentFetch />)

    // When

    // Then
    await waitFor(() => {
      expect(screen.getByText('20201125')).toBeInTheDocument()
    })
  })
})

describe('ServerComponentFetch 테스트', () => {
  beforeAll(() => {
    mocked.ServerComponentFetch.mockImplementation(originals.ServerComponentFetch)
  })
  afterAll(() => {
    mocked.ServerComponentFetch.mockRestore()
  })
  it(`데이터 가져오기가 완료된 후 '20110322' 텍스트가 있어야 한다`, async () => {
    // Given
    const page = await ServerComponentFetch()
    render(page)

    // When

    // Then
    expect(screen.getByText('20110322')).toBeInTheDocument()
  })
})

describe('RouteHandlerRequestPage 테스트', () => {
  it(`'Hello RouteHandlerRequestPage!' 텍스트를 포함한 h1 요소가 있어야 한다`, async () => {
    // Given
    const page = await RouteHandlerRequestPage()
    render(page)

    // When

    // Then
    expect(
      screen.getByRole('heading', { name: 'Hello RouteHandlerRequestPage!', level: 1 }),
    ).toBeInTheDocument()
  })

  it(`'Client =', 'Server =' 텍스트가 있어야 한다`, async () => {
    // Given
    const page = await RouteHandlerRequestPage()
    render(page)

    // When

    // Then
    expect(screen.getByText('Client =')).toBeInTheDocument()
    expect(screen.getByText('Server =')).toBeInTheDocument()
  })
})
