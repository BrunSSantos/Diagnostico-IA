import type { Metadata } from 'next'
import '../globals.css'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin Page',
}
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="auth-body">
          <Provider>{children}</Provider>
          </body>
      </html>
    )
  }