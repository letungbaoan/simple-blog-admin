'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n/client'

export default function Sidebar() {
  const { t } = useTranslation()

  const toggleLanguage = () => {
    const newLng = i18n.language === 'en' ? 'vi' : 'en'
    i18n.changeLanguage(newLng)
  }

  return (
    <aside className='flex h-screen w-64 flex-col bg-gray-800 p-4 text-white'>
      <h2 className='mb-6 text-xl font-bold'>{t('dashboard')}</h2>

      <nav className='flex flex-col gap-3'>
        <Link href='/dashboard/posts' className='rounded px-3 py-2 hover:bg-gray-700'>
          {t('all_posts')}
        </Link>
        <Link href='/dashboard/posts/new' className='rounded px-3 py-2 hover:bg-gray-700'>
          {t('add_post')}
        </Link>
      </nav>

      <button onClick={toggleLanguage} className='mt-auto rounded bg-gray-700 px-3 py-2 hover:bg-gray-600'>
        {i18n.language === 'en' ? t('switch_to_vietnamese') : t('switch_to_english')}
      </button>
    </aside>
  )
}
