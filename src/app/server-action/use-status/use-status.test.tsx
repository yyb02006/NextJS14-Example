import { render, screen } from '@testing-library/react'
import UseStatusPage from './page'

jest.mock('./SubmitButton', () => {
  return jest.fn(() => <button>Submit</button>)
})

jest.mock('./fetchFunction', () => {
  return { createInvoice: '' }
})

test(`testCase에 맞는 input 요소가 있어야한다`, () => {
  // Given
  const testCase = { inputType: 'text', inputName: 'name' }
  render(<UseStatusPage />)

  // When

  // Then
  const inputEl = screen.getByRole('textbox')
  expect(inputEl).toHaveAttribute('type', testCase.inputType)
  expect(inputEl).toHaveAttribute('name', testCase.inputName)
})

test(`올바른 텍스트를 가진 폼 제출 버튼이 있어야 한다`, () => {
  // Given
  render(<UseStatusPage />)

  // When

  // Then
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
})
