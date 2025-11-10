'use client'

import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function PostDetailPage() {
  const params = useParams()
  const { postId } = params
  const { t } = useTranslation()

  return (
    <div>
      <h1 className='mb-4 text-2xl font-bold text-black'>
        {t('post_detail')} {postId}
      </h1>
      <p className='text-black'>{t('post_content')}</p>
    </div>
  )
}
