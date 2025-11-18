import { NextResponse } from 'next/server'
import { Post } from '@/types/post.d'
import { revalidatePath } from 'next/cache'
import { API_ENDPOINTS } from '@/constants/api'

// GET — lấy toàn bộ posts từ JSON Server
export async function GET() {
  try {
    const res = await fetch(API_ENDPOINTS.POSTS, { cache: 'no-store' })

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 })
    }

    const posts: Post[] = await res.json()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 })
  }
}

// POST — tạo bài viết mới
export async function POST(request: Request) {
  try {
    const newPostData = await request.json()

    if (!newPostData.title || !newPostData.content || !newPostData.author) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const newId = newPostData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-*|-*$/g, '')

    const newPost: Post = {
      id: newId,
      ...newPostData,
      createdAt: new Date().toISOString()
    }

    const res = await fetch(API_ENDPOINTS.POSTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to create post' }, { status: 500 })
    }

    revalidatePath('/dashboard/posts')
    revalidatePath(`/dashboard/posts/${newPost.id}`)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request', error }, { status: 500 })
  }
}

// PUT — update bài viết
export async function PUT(request: Request) {
  try {
    const updatedPost = await request.json()

    if (!updatedPost.id) {
      return NextResponse.json({ message: 'Post ID is required for update' }, { status: 400 })
    }

    const res = await fetch(API_ENDPOINTS.POST_DETAIL(updatedPost.id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to update post' }, { status: 500 })
    }

    const result = await res.json()

    revalidatePath(`/dashboard/posts/${updatedPost.id}`)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request', error }, { status: 500 })
  }
}
