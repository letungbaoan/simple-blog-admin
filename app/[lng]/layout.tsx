import React from 'react'
import I18nProvider from '@/app/components/I18nProvider'
import NextAuthProvider from '@/app/components/NextAuthProvider'
import { languages } from '@/i18n/settings'

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function LanguageLayout({
  children,
  params: { lng }
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <I18nProvider lng={lng}>
      <NextAuthProvider>{children}</NextAuthProvider>
    </I18nProvider>
  )
}
