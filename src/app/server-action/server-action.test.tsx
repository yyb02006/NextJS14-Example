import { render, screen, waitFor } from '@testing-library/react'
import ServerActionPage from './page'
import { logging } from '../actions'
import userEvent from '@testing-library/user-event'

jest.mock('../actions', () => {
  return { createInvoice: '', updateUser: jest.fn(), logging: jest.fn() }
})

userEvent.setup()

test(`testCase에 맞는 input, label 요소가 있어야한다`, () => {
  // Given
  const testCase = [
    { inputType: 'text', inputId: 'id', inputName: 'id', labelHtmlfor: 'id', labelName: 'id' },
    {
      inputType: 'text',
      inputId: 'name',
      inputName: 'name',
      labelHtmlfor: 'name',
      labelName: 'name',
    },
    {
      inputType: 'number',
      inputId: 'age',
      inputName: 'age',
      labelHtmlfor: 'age',
      labelName: 'age',
    },
    { inputType: 'text', inputId: 'job', inputName: 'job', labelHtmlfor: 'job', labelName: 'job' },
  ]
  render(<ServerActionPage />)

  // When

  // Then
  testCase.forEach(({ inputId, inputName, inputType, labelHtmlfor, labelName }) => {
    const inputEl = screen.getByLabelText(labelName)
    const labelEl = screen.getByText(labelName, { selector: 'label' })

    expect(inputEl).toHaveAttribute('type', inputType)
    expect(inputEl).toHaveAttribute('id', inputId)
    expect(inputEl).toHaveAttribute('name', inputName)
    expect(labelEl).toHaveAttribute('for', labelHtmlfor)
  })
})

test(`올바른 텍스트를 가진 폼 제출 버튼이 있어야 한다`, () => {
  // Given
  render(<ServerActionPage />)

  // When

  // Then
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
})

test(`'Non-form Button' 버튼 클릭 시 logging 함수가 호출되어야 한다`, async () => {
  // Given
  render(<ServerActionPage />)

  // When
  userEvent.click(screen.getByRole('button', { name: 'Non-form Button' }))

  // Then
  await waitFor(() => {
    expect(logging).toHaveBeenCalled()
  })
})
