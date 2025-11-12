import { Post } from '@/types/post'
import PostsListClient from './PostPage'

async function getPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:3000/api/posts', {
    next: { revalidate: 60 }
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
