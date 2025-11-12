import { Post } from '@/types/post.d'
import PostDetailClient from './PostDetailClient'
import { notFound } from 'next/navigation'

async function getPostDetail(postId: string): Promise<Post> {
  const res = await fetch('http://localhost:3000/api/posts', {
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch posts list')
  }

  const posts: Post[] = await res.json()
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    notFound()
  }

  return post
}

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const post = await getPostDetail(postId)

  return <PostDetailClient post={post} />
}
