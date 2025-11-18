import PostForm from '@/app/components/PostForm'

export default function CreatePostPage() {
  return (
    <div className='mx-auto max-w-3xl p-4'>
      <PostForm isEditMode={false} />
    </div>
  )
}
