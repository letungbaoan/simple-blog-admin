import { Post } from '@/types/post'
import PostsListClient from './PostPage'
import { API_ENDPOINTS } from '@/constants/api'

async function getPosts(): Promise<Post[]> {
  const res = await fetch(API_ENDPOINTS.POSTS, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  return res.json()
}

export default async function Page() {
  const postsData = await getPosts()

  return <PostsListClient posts={postsData} />
}
