import { render, screen } from '@testing-library/react'
import FetchComment from '../fetch-comment'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

test(`데이터 가져오기 완료 후 'Comments were fetched successfully. ( delayed 3 seconds )' 텍스트가 있어야 한다`, async () => {
  // Given
  const pagePromise = FetchComment()
  jest.runAllTimers()
  const page = await pagePromise
  render(page)

  // When

  // Then
  expect(
    screen.getByText('Comments were fetched successfully. ( delayed 3 seconds )'),
  ).toBeInTheDocument()
})
