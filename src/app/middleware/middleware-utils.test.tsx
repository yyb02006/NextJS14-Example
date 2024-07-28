import { NextRequest, NextResponse } from 'next/server'
import { revertToFrom } from './redirect'
import cookies from './cookies'
import middlewareCors from './cors'

const mockedUrl = 'http://localhost:3000'

const nextCookiesSet = jest.fn()
const nextCookiesGet = jest.fn()
const nextCookiesGetAll = jest.fn()
const nextCookiesHas = jest.fn()
const nextCookiesDelete = jest.fn()

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url: string) => ({
      cookies: {
        set: jest.fn(),
      },
      url,
    })),
    next: jest.fn(() => ({
      cookies: {
        set: nextCookiesSet,
        get: nextCookiesGet,
        delete: nextCookiesDelete,
        getAll: nextCookiesGetAll,
        has: nextCookiesHas,
      },
    })),
  },
}))

// request 객체 모킹 아래 방법이 될까?
const nextRequest = jest.fn(() => ({ headers: { get: jest.fn() }, method: 'GET' }))
const mockedRequest = jest.fn(() => new NextRequest('mockedUrl', { method: 'GET' }))

describe('revertToFrom 테스트', () => {
  it(`redirect 메서드가 ${mockedUrl}을 전달받아야 한다`, () => {
    // Given
    revertToFrom(mockedUrl)

    // When

    // Then
    expect(NextResponse.redirect).toHaveBeenCalledWith(mockedUrl)
  })

  it(`반환된 객체의 cookies.set 메서드가 'requested-url', ${mockedUrl}을 전달받아야 한다`, () => {
    // Given
    const result = revertToFrom(mockedUrl)

    // When

    // Then
    expect(result.cookies.set).toHaveBeenCalledWith('requested-url', mockedUrl)
  })

  it(`반환된 객체의 url 프로퍼티가 ${mockedUrl}이어야 한다`, () => {
    // Given
    const result = revertToFrom(mockedUrl)

    // When

    // Then
    expect(result.url).toEqual(mockedUrl)
  })
})

describe('cookies 테스트', () => {
  const textCases = [
    { name: 'middleware-payload', value: 'cat' },
    { name: 'middleware-payload', value: 'dog' },
    { name: 'middleware-dessert', value: 'cookie' },
    { name: 'middleware-dessert', value: 'cake' },
    { name: 'middleware-cookie', value: 'candy', path: '/' },
  ]

  it('next 메서드가 호출되어야 한다', () => {
    // Given
    cookies()

    // When

    //Then
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('cookies의 set메서드가 testCases의 요소들을 인수로 받아 호출되어야 한다', () => {
    // Given
    cookies()

    // When

    // Then
    textCases.forEach(({ name, value, path }) => {
      if (path) {
        expect(nextCookiesSet).toHaveBeenCalledWith({ name, value, path })
      } else {
        expect(nextCookiesSet).toHaveBeenCalledWith(name, value)
      }
    })
  })

  it(`cookies의 get 메서드가 'middleware-cookie'를 인수로 받아 호출되어야 한다`, () => {
    // Given
    cookies()

    // When

    // Then
    expect(nextCookiesGet).toHaveBeenCalledWith('middleware-cookie')
  })

  it(`cookies의 getAll 메서드가 2번 호출되어야 한다`, () => {
    // Given
    cookies()

    // When

    // Then
    expect(nextCookiesGetAll).toHaveBeenCalledTimes(2)
  })

  it(`cookies의 delete 메서드가 'middleware-payload'를 인수로 받아 호출되어야 한다`, () => {
    // Given
    cookies()

    // When

    // Then
    expect(nextCookiesDelete).toHaveBeenCalledWith('middleware-payload')
  })

  it(`cookies의 has 메서드가 'middleware-dessert'를 인수로 받아 호출되어야 한다`, () => {
    // Given
    cookies()

    // When

    // Then
    expect(nextCookiesHas).toHaveBeenCalledWith('middleware-dessert')
  })
})

describe('middlewareCors 테스트', () => {
  const allowedOrigins = ['https://domain1.com', 'https://domain2.org']
  const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  it('preflight 요청의 응답이 allowedOrigins를 포함해야한다', () => {
    const request = new NextRequest('https://example.com/api/test', {
      method: 'OPTIONS',
      headers: {
        origin: 'https://domain1.com',
      },
    })

    const response = middlewareCors(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://domain1.com')
    expect(response.headers.get('Access-Control-Allow-Methods')).toBe(
      corsOptions['Access-Control-Allow-Methods'],
    )
    expect(response.headers.get('Access-Control-Allow-Headers')).toBe(
      corsOptions['Access-Control-Allow-Headers'],
    )
  })
})
