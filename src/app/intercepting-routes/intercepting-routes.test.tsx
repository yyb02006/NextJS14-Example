import { render, screen } from '@testing-library/react'
import InterceptingRoutesLayout from './layout'

describe('Layout Component Rendering Test', () => {
  const navButtons = [
    { label: 'to Feed', path: '/intercepting-routes/feed' },
    { label: 'to Photo', path: '/intercepting-routes/photo' },
  ]
  it(`'Global Nav in intercepting-routes Layout' 텍스트를 가진 div 요소가 있어야 한다`, () => {
    render(<InterceptingRoutesLayout children={<>children</>} />)
    const divElement = screen.getByText('Global Nav in intercepting-routes Layout', {
      selector: 'div',
    })
    expect(divElement).toBeInTheDocument()
  })
  it(`navButtons 객체의 프로퍼티로 만들어진 버튼들이 있어야 한다`, () => {
    render(<InterceptingRoutesLayout children={<>children</>} />)
    navButtons.forEach(({ label: name, path }) => {
      const link = screen.getByRole('link', { name })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', path)
    })
  })
  it(`전체 레이아웃이 예상대로 렌더링 되어야 한다`, () => {
    const { container } = render(<InterceptingRoutesLayout children={<>children</>} />)
    expect(container).toMatchSnapshot()
  })
})
