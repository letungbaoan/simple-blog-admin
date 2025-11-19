'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface NextAuthProviderProps {
  children: ReactNode
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
