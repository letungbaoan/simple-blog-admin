'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Post } from '@/types/post.d'

interface PostsPageProps {
  posts: Post[]
}

export default function PostsListClient({ posts }: PostsPageProps) {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold text-gray-800'>{t('all_posts')}</h1>

      {posts.length === 0 ? (
        <p className='italic text-gray-600'>{t('empty_posts')}</p>
      ) : (
        <div className='flex flex-col gap-3'>
          {posts.map((post) => (
            <div
              key={post.id}
              className='block rounded-lg bg-white p-4 shadow-md transition duration-300 hover:shadow-lg'
            >
              <Link href={`/dashboard/posts/${post.id}`} className='block text-black'>
                <h2 className='text-xl font-semibold text-indigo-600 transition duration-300 hover:text-indigo-800'>
                  {post.title}
                </h2>
              </Link>
              <p className='mt-1 text-sm text-gray-500'>
                {t('author_label')}: {post.author} | {t('created_at_label')}:{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
