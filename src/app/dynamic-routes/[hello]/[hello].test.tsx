import { render, screen } from '@testing-library/react'
import DynamicHelloPage, { generateStaticParams } from './page'

describe('Page Component Rendering Test', () => {
  it(`generateStaticParams 함수가 3초 후에 { hello: param }[] 타입의 배열을 리턴해야 한다`, async () => {
    const params = await generateStaticParams()
    expect(Array.isArray(params)).toBe(true)
    params.forEach((param) => {
      expect(param).toHaveProperty('hello')
    })
  })
  it('올바른 텍스트를 가진 div 요소들이 있어야 한다', () => {
    render(<DynamicHelloPage params={{ hello: 'n' }} />)
    const parentTextEl = screen.getByText('Current Hello Params = n', { selector: 'div' })
    const childTextEl = screen.getByText('Hello DynamicHelloPage!', { selector: 'div' })
    expect(parentTextEl).toBeInTheDocument()
    expect(childTextEl).toBeInTheDocument()
  })
})
