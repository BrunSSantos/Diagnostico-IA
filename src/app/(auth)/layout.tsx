import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Page',
}
export default function AuthLayout({
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