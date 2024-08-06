import { render, screen } from '@testing-library/react'
import ReqMemoPage from './page'
import ReqMemoLayout from './layout'
import { server } from '#/mocks/node'
import { callFetch } from './actions'

jest.mock('#/app/caching/ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url}>{description}</div>
  }
})

jest.mock('./components/ServerCatComponent', () => {
  return () => <div />
})

jest.mock('./components/ClientCatComponent', () => {
  return () => <div />
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(`ReqMemoPage 테스트`, () => {
  it(`ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCase = {
      testId: 'mocked url',
      description: 'Server Page Fetch Image',
    }
    const page = await ReqMemoPage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe(`ReqMemoLayout 테스트`, () => {
  it(`ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다`, async () => {
    // Given
    const testCase = {
      testId: 'mocked url',
      description: 'Server Layout Fetch Image',
    }
    const page = await ReqMemoLayout({ children: <div /> })
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe(`callFetch 테스트`, () => {
  it(`mocked url을 반환해야 한다`, async () => {
    // Given
    const url = await callFetch()

    // When

    // Then
    expect(url).toEqual('mocked url')
  })
})
