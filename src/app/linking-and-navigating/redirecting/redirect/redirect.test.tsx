import { render, screen } from '@testing-library/react'
import ServerRedirecting from './page'
import { timeout } from '#/utils/timeout'
import { redirect } from 'next/navigation'

jest.mock('#/utils/timeout')
jest.mock('next/navigation', () => ({ redirect: jest.fn() }))
const mockTimeout = timeout as jest.Mock

const renderPageWithMock = async ({
  mockTimeoutValue,
}: {
  mockTimeoutValue: { success: boolean; role?: 'admin' | 'user' }
}) => {
  mockTimeout.mockResolvedValue(mockTimeoutValue)
  const Page = await ServerRedirecting()
  render(Page)
}

describe('api 응답 실패', () => {
  it('redirect 함수가 호출되어야 한다', async () => {
    // Given
    await renderPageWithMock({ mockTimeoutValue: { success: false } })

    // When

    // Then
    expect(redirect).toHaveBeenCalledWith('/linking-and-navigating')
  })
})

describe('api 응답 성공', () => {
  it('redirect 함수가 호출되지 않아야 한다', async () => {
    // Given
    await renderPageWithMock({ mockTimeoutValue: { success: true } })

    // When

    // Then
    expect(redirect).not.toHaveBeenCalled()
  })

  it(`'Hello ServerRedirecting Page!'텍스트가 있는 h1요소가 있어야 한다`, async () => {
    // Given
    await renderPageWithMock({ mockTimeoutValue: { success: true, role: 'admin' } })

    // When

    // Then
    const headingEl = screen.getByRole('heading', {
      name: 'Hello ServerRedirecting Page!',
      level: 1,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(`'your role is admin'텍스트가 있는 div요소가 있어야 한다`, async () => {
    // Given
    const role = 'admin'
    await renderPageWithMock({ mockTimeoutValue: { success: true, role } })

    // When

    // Then
    const textEl = screen.getByText(`your role is ${role}`, { selector: 'div' })
    expect(textEl).toBeInTheDocument()
  })
})
