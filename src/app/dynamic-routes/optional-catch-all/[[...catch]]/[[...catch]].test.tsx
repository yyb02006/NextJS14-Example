import { render, screen } from '@testing-library/react'
import OptionalCatchAllPage from './page'

describe('Page Component Rendering Test', () => {
  const basicText = 'Current Optional Catch-all Segments ='
  it(`'Hello OptionalCatchAllPage!' 텍스트가 있는 div 요소가 있어야 한다`, () => {
    render(<OptionalCatchAllPage params={{ catch: undefined }} />)
    const textEl = screen.getByText('Hello OptionalCatchAllPage!', { selector: 'div' })
    expect(textEl).toBeInTheDocument()
  })
  it(`Catch 파라미터가 존재하지 않는 경우 'doesn't exist any segments' 텍스트가 있는 div 요소가 있어야 한다.`, () => {
    render(<OptionalCatchAllPage params={{ catch: undefined }} />)
    const textEl = screen.getByText(`${basicText} Doesn't exist any segments`, { selector: 'div' })
    expect(textEl).toBeInTheDocument()
  })
  it(`Catch 파라미터가 존재하는 경우 파라미터를 보여주는 텍스트가 있는 div 요소가 있어야 한다.`, () => {
    const catchProp = ['n', 'e', 'x', 't']
    render(<OptionalCatchAllPage params={{ catch: catchProp }} />)
    const textEl = screen.getByText(`${basicText} /n/e/x/t`)
    expect(textEl).toBeInTheDocument()
  })
})
