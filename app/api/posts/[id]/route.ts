import { NextRequest, NextResponse } from 'next/server'
import { Post } from '@/types/post.d'
import { API_ENDPOINTS } from '@/constants/api'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params

  try {
    const res = await fetch(API_ENDPOINTS.POST_DETAIL(id), { cache: 'no-store' })

    if (res.status === 404) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to fetch post' }, { status: 500 })
    }

    const post: Post = await res.json()
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 })
  }
}
