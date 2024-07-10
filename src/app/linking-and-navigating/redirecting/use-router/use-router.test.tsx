import { render, screen } from '@testing-library/react'
import UseRouterSuspense from './page'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
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
    ;(useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue(routerMock)
  })
  it(`쿼리스트링이 존재할 때 올바른 URL이 표시되어야 한다`, () => {
    render(<UseRouterSuspense />)
    expect(screen.getByText('URL :', { selector: 'li' })).toBeInTheDocument()
    expect(screen.getByText('/test?test', { selector: 'span' })).toBeInTheDocument()
  })
  it(`쿼리스트링이 존재하지 않을 때 올바른 URL이 표시되어야 한다`, () => {
    ;(useSearchParams as jest.MockedFunction<typeof useSearchParams>).mockReturnValueOnce(
      new URLSearchParams('') as unknown as ReadonlyURLSearchParams,
    )
    render(<UseRouterSuspense />)
    expect(screen.getByText('URL :', { selector: 'li' })).toBeInTheDocument()
    expect(screen.getByText('/test', { selector: 'span' })).toBeInTheDocument()
    ;(useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue(routerMock)
  })
  it(`'UseRouter.push to Root'버튼을 클릭하면 ('/', { scroll: false })인자를 전달받은 push 메서드가 호출된다`, async () => {
    render(<UseRouterSuspense />)
    const buttonEl = screen.getByRole('button', { name: 'UseRouter.push to Root' })
    await user.click(buttonEl)
    expect(useRouter().push).toHaveBeenCalledWith('/', { scroll: false })
  })
  it(`'UseRouter.replace to Root'버튼을 클릭하면 ('/', { scroll: false })인자를 전달받은 replace 메서드가 호출된다`, async () => {
    render(<UseRouterSuspense />)
    const buttonEl = screen.getByRole('button', { name: 'UseRouter.replace to Root' })
    await user.click(buttonEl)
    expect(useRouter().replace).toHaveBeenCalledWith('/', { scroll: false })
  })
  it(`'Prefetch'버튼을 클릭하면 ('/linking-and-navigating')인자를 전달받은 prefetch 메서드가 호출된다`, async () => {
    render(<UseRouterSuspense />)
    const buttonEl = screen.getByRole('button', { name: 'Prefetch' })
    await user.click(buttonEl)
    expect(useRouter().prefetch).toHaveBeenCalledWith('/linking-and-navigating')
  })
  it(`'Refresh'버튼을 클릭하면 refresh 메서드가 호출된다`, async () => {
    render(<UseRouterSuspense />)
    const buttonEl = screen.getByRole('button', { name: 'Refresh' })
    await user.click(buttonEl)
    expect(useRouter().refresh).toHaveBeenCalled()
  })
  it(`'Move to Back'버튼을 클릭하면 back 메서드가 호출된다`, async () => {
    render(<UseRouterSuspense />)
    const buttonEl = screen.getByRole('button', { name: 'Move to Back' })
    await user.click(buttonEl)
    expect(useRouter().back).toHaveBeenCalled()
  })
  it(`'Move to Forward'버튼을 클릭하면 forward 메서드가 호출된다`, async () => {
    render(<UseRouterSuspense />)
    const buttonEl = screen.getByRole('button', { name: 'Move to Forward' })
    await user.click(buttonEl)
    expect(useRouter().forward).toHaveBeenCalled()
  })
})
