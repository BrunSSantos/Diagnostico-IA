
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'


export const metadata: Metadata = {
  title: 'Diagnostico',
  description: 'TG',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className='m-auto 0 p-5'>{children}</body>
    </html>
  )
}
