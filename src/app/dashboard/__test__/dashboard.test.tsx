import '@testing-library/jest-dom'
import { getByRole, getByText, render, screen } from '@testing-library/react'
import DashboardPage from '../page'
import DashboardLayout from '../layout'
import TestPage from '../testPage'

describe('Layout Component Rendering Test', () => {
  it('Hello DashBoardLayout text를 가진 heading이 있어야 한다.', () => {
    render(<DashboardLayout children={<div />} />)
    const headingEl = screen.getByRole('heading', { level: 1, name: 'Hello DashBoardLayout' })
    expect(headingEl).toBeInTheDocument()
  })
  it('children 프로퍼티에 div를 전달된 요소가 있어야한다', () => {
    render(<DashboardLayout children={<div>children</div>} />)
    const headingEl = screen.getByText('children')
    expect(headingEl).toBeInTheDocument()
  })
})
