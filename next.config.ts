import type { NextConfig } from 'next'
import { i18n } from './next-i18next.config'

const nextConfig: NextConfig = {
  i18n,
  images: {
    domains: ['cdn.pixabay.com']
  }
}

export default nextConfig
