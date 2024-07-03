import { render, screen } from '@testing-library/react'
import DynamicRoutesPage from '../page'
import DynamicRoutesLayout from '../layout'

describe('Layout Component Rendering Test', () => {
  const navButtonData = [
    { label: 'to [dynamic]', path: '/dynamic-routes/n' },
    { label: 'to [...Catch-all]', path: '/dynamic-routes/catch-all/c/a/t/c/h/a/l/l' },
    { label: 'to [[...Optional-Catch-all]]', path: '/dynamic-routes/optional-catch-all' },
  ]
  it('올바른 label을 가진 navigation button들이 존재해야 한다', () => {
    render(<DynamicRoutesLayout children={<div />} />)
    const navButtonLabels = navButtonData.map(({ label }) => label)
    navButtonLabels.forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })
  it('올바른 path를 가진 navigation button들이 존재해야 한다', () => {
    render(<DynamicRoutesLayout children={<div />} />)
    navButtonData.forEach(({ label, path }) => {
      const anchorElement = screen.getByRole('link', { name: label })
      expect(anchorElement).toHaveAttribute('href', path)
    })
  })
})
describe('Page Component Rendering Test', () => {
  it('Choose a route 텍스트를 가진 요소가 있어야 한다', () => {
    render(<DynamicRoutesPage />)
    const textEl = screen.getByText('Choose a route')
    expect(textEl).toBeInTheDocument()
    expect(textEl.tagName).toBe('DIV')
  })
})
