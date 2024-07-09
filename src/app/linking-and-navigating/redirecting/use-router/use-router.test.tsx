import { render, screen } from '@testing-library/react'
import UseRouterSuspense from './page'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/test'),
  useSearchParams: jest.fn(() => new URLSearchParams('a=test')),
}))

const user = userEvent.setup()

describe('Page Component Rendering Test', () => {
  const routerMock = {
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  }
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(routerMock)
    render(<UseRouterSuspense />)
  })
  it(`올바른 URL이 표시되어야 한다`, () => {
    expect(screen.getByText('URL :', { selector: 'li' })).toBeInTheDocument()
    expect(screen.getByText('/test?test', { selector: 'span' })).toBeInTheDocument()
  })
  it(`'UseRouter.push to Root'버튼을 클릭하면 ('/', { scroll: false })인자를 전달받은 push 메서드가 호출된다`, async () => {
    const buttonEl = screen.getByRole('button', { name: 'UseRouter.push to Root' })
    await user.click(buttonEl)
    expect(useRouter().push).toHaveBeenCalledWith('/', { scroll: false })
  })
})
