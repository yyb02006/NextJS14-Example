import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '#/app/page'

describe('라우트 별 렌더링 테스트', () => {
  it('should be rendered in DOM', () => {
    render(<Page />)

    const heading = screen.getByRole('main')

    expect(heading).toBeInTheDocument()
  })
})
