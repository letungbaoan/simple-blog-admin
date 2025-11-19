import React from 'react'
import { Post } from '@/types/post.d'
import PostDetailClient from './PostDetailClient'
import { notFound } from 'next/navigation'
import { API_ENDPOINTS } from '@/constants/api'

async function getPostDetail(postId: string): Promise<Post> {
  const res = await fetch(API_ENDPOINTS.POST_DETAIL(postId), {
    cache: 'no-store'
  })

  if (res.status === 404) {
    notFound()
  }

  if (!res.ok) {
    throw new Error('Failed to fetch post detail')
  }

  return res.json()
}

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const post = await getPostDetail(postId)

  return <PostDetailClient post={post} />
}
