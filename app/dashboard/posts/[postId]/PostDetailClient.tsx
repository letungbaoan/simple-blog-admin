'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { Post } from '@/types/post.d'

interface PostDetailClientProps {
  post: Post
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const { t } = useTranslation()

  return (
    <div className='rounded-lg bg-white p-6 shadow-xl'>
      <div className='relative mb-6 h-80 w-full overflow-hidden rounded-lg'>
        <Image
          src={post.imageUrl}
          alt={`Thumbnail for ${post.title}`}
          fill
          className='object-cover'
          priority
          sizes='(max-width: 1024px) 100vw, 800px'
        />
      </div>

      <h1 className='mb-4 text-4xl font-extrabold text-gray-800'>{post.title}</h1>

      <p className='mb-4 border-b pb-4 text-base text-gray-600'>
        {t('author_label')}: <span className='font-medium text-gray-700'>{post.author}</span> |{t('created_at_label')}:{' '}
        <span className='font-medium text-gray-700'>{new Date(post.createdAt).toLocaleDateString()}</span>
      </p>

      <div className='mt-8 text-lg leading-relaxed text-gray-700'>
        <p>{post.content}</p>

        <p className='mt-4 text-sm italic text-gray-600'>
          ({t('post')} ID: {post.id})
        </p>
      </div>
    </div>
  )
}
