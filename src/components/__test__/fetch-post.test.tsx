import { render, screen } from '@testing-library/react'
import FetchPost from '../fetch-post'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

test(`데이터 가져오기 완료 후 'Post was fetched successfully. ( delayed 5 seconds )' 텍스트가 있어야 한다`, async () => {
  // Given
  const pagePromise = FetchPost()
  jest.runAllTimers()
  const page = await pagePromise
  render(page)

  // When

  // Then
  expect(
    screen.getByText('Post was fetched successfully. ( delayed 5 seconds )'),
  ).toBeInTheDocument()
})
