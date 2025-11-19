import Sidebar from '../components/Sidebar'
import SessionWrapper from '@/app/components/SessionWrapper'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen'>
      <SessionWrapper>
        <Sidebar />
      </SessionWrapper>
      <main className='ml-64 flex-1 bg-gray-100 p-6'>{children}</main>
    </div>
  )
}
