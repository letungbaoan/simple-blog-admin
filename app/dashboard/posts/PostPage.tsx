'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface Post {
  id: string
  title: string
}

interface PostsPageProps {
  posts: Post[]
}

export default function PostsPage({ posts }: PostsPageProps) {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold text-black'>{t('all_posts')}</h1>

      {posts.length === 0 ? (
        <p className='italic text-gray-600'>{t('empty_posts') || 'Không có bài viết nào.'}</p>
      ) : (
        <div className='flex flex-col gap-3'>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/dashboard/posts/${post.id}`}
              className='block rounded bg-white p-4 text-black shadow hover:bg-gray-50'
            >
              {t('post')} {post.id}: {post.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
