import { render, screen } from '@testing-library/react'
import ErrorHandlingLayout from './layout'
import ErrorHandlingPage from './page'
import ErrorComponent from './error'

describe('Layout Component Rendering Test', () => {
  it('올바른 텍스트를 가진 div 요소들이 있어야 한다', () => {
    render(<ErrorHandlingLayout children={<>children</>} />)
    const parentTextEl = screen.getByText('Hello ErrorHandlingLayout!', {
      selector: 'section',
    })
    const childTextEl = screen.getByText('children', { selector: 'div' })
    expect(parentTextEl).toBeInTheDocument()
    expect(childTextEl).toBeInTheDocument()
  })
})
describe('Page Component Rendering Test', () => {
  it('올바른 텍스트를 가진 div 요소들이 있어야 한다', () => {
    render(<ErrorHandlingPage />)
    const textEl = screen.getByText('fixed error for build', {
      selector: 'div',
    })
    expect(textEl).toBeInTheDocument()
  })
})

describe('Error Component Rendering Test', () => {
  const error = new Error('Test Error')
  const resetMock = jest.fn()
  it(`'Something Went Wrong!' 텍스트를 가진 div 요소가 있어야 한다`, () => {
    const consoleInstance = jest.spyOn(console, 'error')
    render(<ErrorComponent error={error} reset={resetMock} />)
    const textEl = screen.getByText('Something Went Wrong!', { selector: 'div' })
    expect(textEl).toBeInTheDocument()
    expect(consoleInstance).toHaveBeenCalledWith(error)
    consoleInstance.mockRestore()
  })
  it(`'Try Again' 이라는 텍스트를 가진 button 요소가 있어야 한다`, () => {
    render(<ErrorComponent error={error} reset={resetMock} />)
    const textEl = screen.getByRole('button', { name: 'Try Again' })
    expect(textEl).toBeInTheDocument()
  })
})
