import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '#/app/page'
import dummyDB from './testFn'
import RootLayout from '#/app/layout'
import DashboardLayout from '#/app/dashboard/layout'
import DashboardPage from '#/app/dashboard/page'

/* const mockCallback = jest.fn((x) => 42 + x) */

describe('render several routes', () => {
  /*   const mockFn = jest.fn((x) => x)
  const testFn = (arr: number[]) => {
    arr.forEach((num) => {
      mockFn(num + 1)
    })
  } */
  it('/ 경로를 렌더링 한다', () => {
    render(
      <RootLayout>
        <Page />
      </RootLayout>,
    )
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveTextContent('Hello NextJS! 안뇽!')
  })
  it('/dashboard 경로를 렌더링 한다', () => {
    render(
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>,
    )
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveTextContent('Hello NextJS! 안뇽!')
  })
  /*
  it('deeply equal2', () => {
    const a = [1, 2, 3, 4]
    expect(a).toContain(1)
  })
  it('목 함수 호출', () => {
    mockFn(1)
    mockFn(2)
    console.log(mockFn.mock.calls[0])
    console.log(mockFn.mock.results)
    expect(mockFn.mock.calls.length).toBe(2)
    expect(mockFn.mock.calls[0][0]).toStrictEqual(1)
    expect(mockFn.mock.calls).toHaveLength(2)
    expect(mockFn.mock.results[1].value).toBe(2)
  })
  it('목 리턴 밸류', () => {
    mockFn
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
    mockFn(1)
    mockFn(1)
    mockFn(1)
    mockFn(1)
    expect(mockFn.mock.results[1].value).toBe(false)
  })
  it('목 콜백 함수', () => {
    dummyDB.forEachMock([0, 1], mockCallback)
    // The mock function was called twice
    expect(mockCallback.mock.calls).toHaveLength(2)

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0)

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1)

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42)
  }) */
})
