import PostForm from '@/app/components/PostForm'
import React from 'react'

export default function CreatePostPage() {
  return (
    <div className='mx-auto max-w-3xl p-4'>
      <PostForm isEditMode={false} />
    </div>
  )
}
