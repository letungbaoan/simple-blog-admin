'use client'

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n/client'
import Image from 'next/image'

export default function Sidebar() {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const toggleLanguage = () => {
    const newLng = i18n.language === 'en' ? 'vi' : 'en'
    i18n.changeLanguage(newLng)
  }

  return (
    <aside className='fixed left-0 top-0 flex h-screen w-64 flex-col bg-gray-800 p-4 text-white'>
      <h2 className='mb-6 text-xl font-bold'>{t('dashboard')}</h2>

      <nav className='flex flex-col gap-3'>
        <Link href='/dashboard/posts' className='rounded px-3 py-2 hover:bg-gray-700'>
          {t('all_posts')}
        </Link>
        <Link href='/dashboard/posts/new' className='rounded px-3 py-2 hover:bg-gray-700'>
          {t('add_post')}
        </Link>
      </nav>

      {session && (
        <div className='mt-8 flex items-center gap-3 rounded bg-gray-700 px-3 py-2'>
          {session.user?.image && (
            <Image src={session.user.image} width={40} height={40} alt='User avatar' className='rounded-full' />
          )}
          <div>
            <p className='text-sm font-semibold'>{session.user?.name}</p>
            <p className='text-xs text-gray-300'>{session.user?.email}</p>
          </div>
        </div>
      )}

      <div className='mt-auto flex flex-col gap-2'>
        <button onClick={toggleLanguage} className='rounded bg-gray-700 px-3 py-2 hover:bg-gray-600'>
          {i18n.language === 'en' ? t('switch_to_vietnamese') : t('switch_to_english')}
        </button>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className='rounded bg-red-600 px-3 py-2 hover:bg-red-700'
          >
            {t('logout')}
          </button>
        )}
      </div>
    </aside>
  )
}
