'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Loading() {
  const { t } = useTranslation()

  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-white p-8 shadow-xl'>
      <div className='mb-4 size-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-500' />
      <h2 className='text-xl font-semibold text-gray-700'>{t('loading_posts') || 'Đang tải bài viết...'}</h2>
      <p className='text-sm text-gray-500'>{t('fetching_data_server') || 'Dữ liệu đang được tải từ Server.'}</p>
    </div>
  )
}
