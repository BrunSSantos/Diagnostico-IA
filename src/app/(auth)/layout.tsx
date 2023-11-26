import type { Metadata } from 'next'
import '../globals.css'
import Provider from '@/components/Provider'

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
        <body className="auth-body">
          <Provider>{children}</Provider>
          </body>
      </html>
    )
  }