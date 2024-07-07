import { render, screen } from '@testing-library/react'
import InterceptingFeedPage from './page'
import { useRouter } from 'next/navigation'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }))
const user = userEvent.setup()

describe('Page Component Rendering Test', () => {
  it(`'Hello InterceptingPhotoPage! number140' 텍스트를 가진 div 요소가 있어야 한다`, () => {
    render(<InterceptingFeedPage params={{ id: '140' }} />)
    const textEl = screen.getByText('Hello InterceptingPhotoPage! number140', { selector: 'div' })
    expect(textEl).toBeInTheDocument()
  })
  it(`'Click to Real Page' 텍스트를 가진 button 요소가 있어야 한다`, () => {
    //(useRouter as jest.Mock<any,any,any>).mockImplementation(()=>{})
    render(<InterceptingFeedPage params={{ id: '140' }} />)
    const buttonEl = screen.getByRole('button', { name: 'Click to Real Page' })
    expect(buttonEl).toBeInTheDocument()
  })
  it(`button을 클릭했을 때 href가 '/'에서 '/intercepting-routes/photo/140'로 바뀌어야 한다`, async () => {
    render(<InterceptingFeedPage params={{ id: '140' }} />)
    const buttonEl = screen.getByRole('button', { name: 'Click to Real Page' })
    expect(window.location.href).toBe('/')
    await user.click(buttonEl)
    expect(window.location.href).toBe('/intercepting-routes/photo/140')
  })
})
