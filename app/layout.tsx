import './globals.css'
import { languages } from '../i18n/settings'

export const metadata = {
  title: 'Simple Blog Admin'
}

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lng: string } }) {
  return (
    <html lang={params.lng}>
      <head>
        <title>Simple Blog Admin</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
