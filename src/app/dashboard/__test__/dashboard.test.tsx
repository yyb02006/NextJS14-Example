import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardPage from '../page'
import DashboardLayout from '../layout'

describe('Layout Component Rendering Test', () => {
  it('Hello DashBoardLayout text를 가진 heading이 있어야 한다.', () => {
    render(<DashboardLayout children={<div />} />)
    const headingEl = screen.getByRole('heading', { level: 1, name: 'Hello DashBoardLayout' })
    expect(headingEl).toBeInTheDocument()
  })
  it('children 프로퍼티에 전달된 children 텍스트를 가진 요소가 있어야한다', () => {
    render(<DashboardLayout children={<div>children</div>} />)
    const headingEl = screen.getByText('children')
    expect(headingEl).toBeInTheDocument()
  })
})
describe('Page Component Rendering Test', () => {
  it('Hello, DashBoard Page! text를 가진 div가 있어야 한다.', () => {
    render(<DashboardPage />)
    const headingEl = screen.getByText('Hello, Dashboard Page!')
    expect(headingEl).toBeInTheDocument()
  })
})
