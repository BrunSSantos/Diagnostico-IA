import type { Metadata } from 'next'
import '../../globals.css'

export const metadata: Metadata = {
  title: 'Teste',
  description: 'Admin Page',
}
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="auth-body">{children}</body>
      </html>
    )
  }