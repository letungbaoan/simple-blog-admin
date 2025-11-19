jest.mock('next/server', () => ({
  __esModule: true,
  NextResponse: {
    json: <T = unknown>(data: T, init?: { status?: number }) => {
      return {
        status: init?.status || 200,
        json: async () => data as T
      }
    }
  }
}))

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}))

jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: () => ({ name: 'mock-google-provider' })
}))

jest.mock('next-auth', () => {
  const mockNextAuth = jest.fn(() => ({
    GET: jest.fn(),
    POST: jest.fn()
  }))
  return {
    __esModule: true,
    default: mockNextAuth,
    NextAuth: mockNextAuth,
    __mockNextAuth: mockNextAuth
  }
})

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn()
}))

const API_ENDPOINTS = {
  POSTS: 'http://mock-api/posts',
  POST_DETAIL: (id: string) => `http://mock-api/posts/${id}`
}
jest.mock('@/constants/api', () => ({
  API_ENDPOINTS
}))

global.fetch = jest.fn() as jest.Mock

import { GET } from '@/app/api/posts/route'
import { getServerSession } from 'next-auth/next'

interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

// =================================================================
// TEST CASES
// =================================================================
describe('/api/posts GET', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns posts array when authenticated', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } })

    const fakePosts: Post[] = [
      { id: '1', title: 'Post 1', content: 'Content 1', author: 'Author 1', createdAt: '2025-11-16T12:00:00Z' }
    ]
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => fakePosts,
      status: 200
    })

    const response = await GET()
    const json = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(json)).toBe(true)
    expect(json).toEqual(fakePosts)
  })

  it('returns 401 if not authenticated', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue(null)

    const response = await GET()
    const json = await response.json()

    expect(response.status).toBe(401)
    expect(json).toEqual({ message: 'Unauthorized' })
  })

  it('returns 500 if fetch fails (API error)', async () => {
    ;(getServerSession as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } })
    ;(fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 })

    const response = await GET()
    const json = await response.json()

    expect(response.status).toBe(500)
    expect(json).toEqual({ message: 'Failed to fetch posts' })
  })
})
