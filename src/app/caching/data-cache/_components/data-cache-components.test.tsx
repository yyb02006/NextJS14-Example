import { fireEvent, render, screen } from '@testing-library/react'
import ForceCacheCatImage from './ForceCacheCatImage'
import { server } from '#/mocks/node'
import { HttpResponse, http } from 'msw'
import OnDemandRevalidateCatImage from './OnDemandRevalidateCatImage'
import NoStoreCatImage from './NoStoreCatImage'
import TimerButton from './TimerButton'
import { act } from 'react-dom/test-utils'
import { useRouter } from 'next/navigation'

jest.mock('../../ImageDiv', () => {
  return ({ url, description }: { url: string; description: string }) => {
    return <div data-testid={url}>{description}</div>
  }
})

jest.mock('next/navigation', () => {
  return { useRouter: jest.fn() }
})

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  server.use(
    http.get('https://api.thedogapi.com/v1/images/search', () => {
      return HttpResponse.json([{ url: 'mocked dog url' }])
    }),
  )
})

afterAll(() => {
  server.close()
})

describe('ForceCacheCatImage 테스트', () => {
  it('ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다', async () => {
    // Given
    const testCase = { testId: 'mocked dog url', description: 'Force-Cached Fetch' }
    const page = await ForceCacheCatImage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe('NoStoreCatImage 테스트', () => {
  it('ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다', async () => {
    // Given
    const testCase = { testId: 'mocked url', description: 'No-Store Fetch' }
    const page = await NoStoreCatImage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe('OnDemandRevalidateCatImage 테스트', () => {
  it('ImageDiv 컴포넌트에 testCase와 부합하는 url과 description이 전달되어야 한다', async () => {
    // Given
    const testCase = { testId: 'mocked dog url', description: 'On-Demand Revalidate Fetch' }
    const page = await OnDemandRevalidateCatImage()
    render(page)

    // When

    // Then
    expect(screen.getByTestId(testCase.testId)).toHaveTextContent(testCase.description)
  })
})

describe('TimerButton 테스트', () => {
  const refreshMock = jest.fn()

  beforeAll(() => {
    jest.useFakeTimers()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      refresh: refreshMock,
    }))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => server.resetHandlers())

  it(`첫 화면에 '10'부터 시작하는 타이머를 포함한 버튼이 있어야 한다`, () => {
    // Given
    render(<TimerButton />)

    // When

    // Then
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
  })

  it(`5초 후 '5' 텍스트를 포함한 버튼 있어야 한다`, () => {
    // Given
    render(<TimerButton />)
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    // When

    // Then
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
  })

  it(`10초 후 'Refresh' 텍스트를 포함한 버튼이 있어야 한다`, () => {
    // Given
    render(<TimerButton />)
    act(() => {
      jest.advanceTimersByTime(10000)
    })

    // When

    // Then
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument()
  })

  it(`버튼의 텍스트가 Refresh일 때 클릭하면 refreshMock이 호출되어야 한다`, () => {
    // Given
    render(<TimerButton />)
    act(() => {
      jest.advanceTimersByTime(10000)
    })

    // When
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }))

    // Then
    expect(refreshMock).toHaveBeenCalled()
  })

  it(`버튼의 텍스트가 Refresh가 아닐 때 클릭하면 refreshMock이 호출되지 않아야 한다`, () => {
    // Given
    render(<TimerButton />)

    // When
    fireEvent.click(screen.getByRole('button'))

    // Then
    expect(refreshMock).not.toHaveBeenCalled()
  })
})
