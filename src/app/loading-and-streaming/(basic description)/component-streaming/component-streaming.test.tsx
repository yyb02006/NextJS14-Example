import { render, screen } from '@testing-library/react'
import StreamingComponentsPage from './page'
import StreamingComponentsLayout from './layout'

jest.mock('#/components/fetch-post', () => {
  return () => {
    return <div />
  }
})

jest.mock('#/components/fetch-comment', () => {
  return () => {
    return <div />
  }
})

describe('StreamingComponentsPage 테스트', () => {
  it(`'Hello StreamingComponentsPage!' 텍스트를 가진 h1 요소가 있어야 한다`, () => {
    render(<StreamingComponentsPage />)
    expect(
      screen.getByRole('heading', { name: 'Hello StreamingComponentsPage!', level: 1 }),
    ).toBeInTheDocument()
  })
})

describe('StreamingComponentLayout 테스트', () => {
  it(`'Hello StreamingComponentsLayout!' 텍스트를 가진 h1 요소가 있어야 한다`, () => {
    render(
      <StreamingComponentsLayout>
        <div />
      </StreamingComponentsLayout>,
    )
    expect(
      screen.getByRole('heading', { name: 'Hello StreamingComponentsLayout!', level: 1 }),
    ).toBeInTheDocument()
  })
})
