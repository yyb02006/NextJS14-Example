import { render, screen, waitFor } from '@testing-library/react'
import ServerRedirecting from './page'
import { timeout } from '#/utils/timeout'
import { mockFunction } from '#/utils/mockFunction'

// async server component redirect에 대해 제대로된 테스트가 불가.
// 서버 환경에서는 redirect 모킹도 안되고 redirect 실행도 안되고 그냥 씨발
jest.mock('#/utils/timeout')
jest.mock('#/utils/mockFunction')

describe('ServerRedirecting 컴포넌트', () => {
  const mockTimeout = timeout as jest.Mock

  it('api 응답의 success 프로퍼티가 false일 경우 redirect 함수가 호출되어야 한다', async () => {
    // given
    const mockRedirect = mockFunction as jest.MockedFunction<typeof mockFunction>
    mockTimeout.mockReturnValue({ success: false, resolveProps: { role: 'admin' } })

    // when
    const Page = await ServerRedirecting()
    render(Page)

    // then
    expect(mockRedirect).toHaveBeenCalledWith('/linking-and-navigating')
  })

  it(`api 응답의 success 프로퍼티가 true일 경우 'Hello ServerRedirecting Page!'텍스트가 있는 div요소가 렌더링 되어야 한다`, async () => {
    // given
    const mockRedirect = mockFunction as jest.MockedFunction<typeof mockFunction>
    mockTimeout.mockReturnValue({ success: true, resolveProps: { role: 'admin' } })

    // when
    const Page = await ServerRedirecting()
    render(Page)

    // then
    const textEl = screen.getByText('Hello ServerRedirecting Page!', { selector: 'p' })
    expect(mockRedirect).not.toHaveBeenCalledWith('/linking-and-navigating')
    expect(textEl).toBeInTheDocument()
  })
})
