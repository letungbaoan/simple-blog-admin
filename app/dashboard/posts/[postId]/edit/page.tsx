import PostForm from '@/app/components/PostForm'
import { Post } from '@/types/post.d'
import { notFound } from 'next/navigation'
import { API_ENDPOINTS } from '@/constants/api'

async function getPostById(postId: string): Promise<Post | null> {
  try {
    const res = await fetch(API_ENDPOINTS.POST_DETAIL(postId), { cache: 'no-store' })

    if (res.status === 404) {
      return null
    }

    if (!res.ok) {
      throw new Error('Failed to fetch post')
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function EditPostPage({ params }: { params: { postId: string } }) {
  const { postId } = await params

  const initialPostData = await getPostById(postId)

  if (!initialPostData) {
    notFound()
  }

  return (
    <div className='mx-auto max-w-3xl p-4'>
      <PostForm isEditMode={true} initialData={initialPostData} />
    </div>
  )
}
