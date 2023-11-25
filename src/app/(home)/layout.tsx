
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'


export const metadata: Metadata = {
  title: 'Diagnostico',
  description: 'Home Page',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className='padrao-body'>{children}</body>
    </html>
  )
}
