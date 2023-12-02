import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Redefinição de Senha',
  description: 'Password Page',
}
export default function RedefinirSenha({
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