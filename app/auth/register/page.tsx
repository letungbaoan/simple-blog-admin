'use client'

import { PATHS } from '@/constants/paths'
import { useTranslation } from 'react-i18next'
import React from 'react'

export default function RegisterPage() {
  const { t } = useTranslation('auth')

  return (
    <div className='mx-auto mt-20 w-full max-w-md rounded border p-6'>
      <h1 className='mb-4 text-2xl font-bold'>{t('register_title')}</h1>

      <p className='text-gray-700'>{t('register_google_note')}</p>

      <a href={PATHS.AUTH.LOGIN} className='mt-4 block text-blue-600'>
        {t('login')}
      </a>
    </div>
  )
}
