import { render, screen, waitFor } from '@testing-library/react'
import ServerRedirecting from './page'
import { timeout } from '#/utils/timeout'
import { redirect } from 'next/navigation'

// async server component redirect에 대해 제대로된 테스트가 불가.
// 서버 환경에서는 redirect 모킹도 안되고 redirect 실행도 안되고 그냥 씨발
jest.mock('#/utils/timeout')
jest.mock('next/navigation', () => ({ redirect: jest.fn() }))

describe('ServerRedirecting 컴포넌트', () => {
  const role = 'admin'
  const mockTimeout = timeout as jest.Mock
  it('api 응답의 success 프로퍼티가 false일 경우 redirect 함수가 호출되어야 한다', async () => {
    // given
    mockTimeout.mockReturnValue({ success: false })

    // when
    const Page = await ServerRedirecting()
    render(Page)

    // then
    expect(redirect).toHaveBeenCalledWith('/linking-and-navigating')
  })
  it(`api 응답의 success 프로퍼티가 true일 경우 'Hello ServerRedirecting Page!'텍스트가 있는 div요소가 렌더링 되어야 한다`, async () => {
    // given
    mockTimeout.mockReturnValue({ success: true, role })

    // when
    const Page = await ServerRedirecting()
    render(Page)

    // then
    const headingEl = screen.getByRole('heading', {
      name: 'Hello ServerRedirecting Page!',
      level: 1,
    })
    const textEl = screen.getByText(`your role is ${role}`, { selector: 'div' })
    expect(redirect).not.toHaveBeenCalled()
    expect(headingEl).toBeInTheDocument()
    expect(textEl).toBeInTheDocument()
  })
})
