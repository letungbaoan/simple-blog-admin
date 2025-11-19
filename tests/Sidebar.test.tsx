import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '@/app/components/Sidebar'

jest.mock('@/i18n/client', () => ({}))

const mockUseSession = jest.fn()
const mockSignOut: jest.Mock<void, [{ callbackUrl: string }?]> = jest.fn()

const mockChangeLanguage = jest.fn()
const mockI18n = { language: 'en', changeLanguage: mockChangeLanguage }

const mockUseTranslation = jest.fn(() => ({
  t: (key: string) => key,
  i18n: mockI18n
}))

jest.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
  signOut: (...args: Parameters<typeof mockSignOut>) => mockSignOut(...args)
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => mockUseTranslation()
}))

// ----------------------
// TESTS
// ----------------------
describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseSession.mockReturnValue({ data: null, status: 'unauthenticated' })

    mockI18n.language = 'en'
  })

  // Kiểm tra các link điều hướng có tồn tại
  test('renders main navigation links', () => {
    render(<Sidebar />)

    expect(screen.getByText('all_posts')).toHaveAttribute('href', '/dashboard/posts')
    expect(screen.getByText('add_post')).toHaveAttribute('href', '/dashboard/posts/new')
  })

  // Nếu chưa đăng nhập, user info và logout button không hiển thị
  test('does not show user info or logout button when unauthenticated', () => {
    render(<Sidebar />)

    expect(screen.queryByText('logout')).not.toBeInTheDocument()
    expect(screen.queryByText('Test User')).not.toBeInTheDocument()
  })

  // Giả lập user đã đăng nhập
  // Kiểm tra thông tin user hiển thị đúng
  // Kiểm tra nút logout hoạt động
  test('shows user info and allows logout when authenticated', () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      image: 'https://avatar.test.com/img.jpg'
    }

    mockUseSession.mockReturnValue({
      data: { user: mockUser },
      status: 'authenticated'
    })

    render(<Sidebar />)

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()

    const logoutButton = screen.getByText('logout')
    fireEvent.click(logoutButton)
    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/' })
  })
})
