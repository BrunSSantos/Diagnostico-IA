import type { Metadata } from 'next'
import '../../globals.css'

export const metadata: Metadata = {
  title: 'Cadastro de Usuários',
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