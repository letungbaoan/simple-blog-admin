'use client'

import '@/i18n/client'
import { PATHS } from '@/constants/paths'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function LoginPage() {
  const { t } = useTranslation('auth')

  const loginGoogle = async () => {
    await signIn('google', { callbackUrl: PATHS.DASHBOARD.POSTS })
  }

  return (
    <div className='mx-auto mt-20 w-full max-w-md rounded border p-6'>
      <h1 className='mb-4 text-2xl font-bold'>{t('login_title')}</h1>

      <button onClick={loginGoogle} className='w-full rounded bg-blue-600 py-2 text-white'>
        {t('login_with_google')}
      </button>

      <p className='mt-4 text-center'>
        {t('no_account')}
        <Link className='text-blue-500' href={PATHS.AUTH.SIGNUP}>
          {t('register')}
        </Link>
      </p>
    </div>
  )
}
