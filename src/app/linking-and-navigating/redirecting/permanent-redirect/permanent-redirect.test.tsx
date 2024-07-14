import { render, screen } from '@testing-library/react'
import ServerRedirecting from './page'
import { timeout } from '#/utils/timeout'
import { permanentRedirect } from 'next/navigation'

jest.mock('#/utils/timeout')
jest.mock('next/navigation', () => ({ permanentRedirect: jest.fn() }))
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
  it('permanentRedirect 함수가 호출되어야 한다', async () => {
    // Given
    await renderPageWithMock({ mockTimeoutValue: { success: false } })

    // When

    // Then
    expect(permanentRedirect).toHaveBeenCalledWith('/linking-and-navigating')
  })
})

describe('api 응답 성공', () => {
  it('permanentRedirect 함수가 호출되지 않아야 한다', async () => {
    // Given
    await renderPageWithMock({ mockTimeoutValue: { success: true } })

    // When

    // Then
    expect(permanentRedirect).not.toHaveBeenCalled()
  })

  it(`'Hello PermanentRedirect Page!'텍스트가 있는 h1요소가 있어야 한다`, async () => {
    // Given
    await renderPageWithMock({ mockTimeoutValue: { success: true, role: 'user' } })

    // When

    // Then
    const headingEl = screen.getByRole('heading', {
      name: 'Hello PermanentRedirect Page!',
      level: 1,
    })
    expect(headingEl).toBeInTheDocument()
  })

  it(`'your role is user'텍스트가 있는 div요소가 있어야 한다`, async () => {
    // Given
    const role = 'user'
    await renderPageWithMock({ mockTimeoutValue: { success: true, role } })

    // When

    // Then
    const textEl = screen.getByText(`your role is ${role}`, { selector: 'div' })
    expect(textEl).toBeInTheDocument()
  })
})
