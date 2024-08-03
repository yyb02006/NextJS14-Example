import { render, screen } from '@testing-library/react'
import DelayedDiv from '../components/DelayedDiv'

describe('DelayDiv 테스트', () => {
  jest.resetModules()
  it(`'CyanDiv was fetched successfully. ( delayed 5seconds )' 텍스트와 'bg-cyan-600' 클래스가 있어야 한다`, () => {
    // Given
    const color = 'cyan'
    const delaySec = 5

    // When
    render(<DelayedDiv color={color} delaySec={delaySec} />)

    // Then
    const textEl = screen.getByText('CyanDiv was fetched successfully. ( delayed 5seconds )')
    expect(textEl).toHaveClass('bg-cyan-600')
  })
})
