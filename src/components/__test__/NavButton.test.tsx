import { fireEvent, render, screen } from '@testing-library/react'
import memoryRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import NavButton from '../NavButton'

const label = 'hello'
const path = '/world'

test('', () => {
  // Given
  render(<NavButton label={label} path={path} />, { wrapper: MemoryRouterProvider })

  // When
  fireEvent.click(screen.getByText(label, { selector: 'a' }))

  // Then
  expect(memoryRouter.asPath).toEqual(path)
})
