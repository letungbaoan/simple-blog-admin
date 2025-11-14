'use client'

import { useTranslation } from 'react-i18next'
import { Post } from '@/types/post.d'

interface PostDetailClientProps {
  post: Post
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const { t } = useTranslation()

  return (
    <div className='rounded-lg bg-white p-6 shadow-xl'>
      <h1 className='mb-4 text-4xl font-extrabold text-gray-800'>{post.title}</h1>

      <p className='mb-4 text-sm text-gray-500'>
        {t('author_label')}: <span className='font-medium text-gray-700'>{post.author}</span> |{t('created_at_label')}:{' '}
        <span className='font-medium text-gray-700'>{new Date(post.createdAt).toLocaleDateString()}</span>
      </p>

      <div className='mt-8 border-t pt-6 text-lg leading-relaxed text-gray-700'>
        <p>{post.content}</p>

        <p className='mt-4 text-sm italic text-gray-600'>
          ({t('post')} ID: {post.id})
        </p>
      </div>
    </div>
  )
}
