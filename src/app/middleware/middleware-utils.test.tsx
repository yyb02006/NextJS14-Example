import { NextResponse } from 'next/server'
import { revertToFrom } from './redirect'

const mockedUrl = 'http://localhost:3000'

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url: string) => ({
      cookies: {
        set: jest.fn(),
      },
      url,
    })),
  },
}))

test(`redirect 메서드가 ${mockedUrl}을 전달받아야 한다`, () => {
  // Given
  revertToFrom(mockedUrl)

  // When

  // Then
  expect(NextResponse.redirect).toHaveBeenCalledWith(mockedUrl)
})

test(`반환된 객체의 cookies.set 메서드가 'requested-url', ${mockedUrl}을 전달받아야 한다`, () => {
  // Given
  const result = revertToFrom(mockedUrl)

  // When

  // Then
  expect(result.cookies.set).toHaveBeenCalledWith('requested-url', mockedUrl)
})

test(`반환된 객체의 url 프로퍼티가 ${mockedUrl}이어야 한다`, () => {
  // Given
  const result = revertToFrom(mockedUrl)

  // When

  // Then
  expect(result.url).toEqual(mockedUrl)
})
