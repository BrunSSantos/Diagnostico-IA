import type { Metadata } from 'next'
import '../../globals.css'

export const metadata: Metadata = {
  title: 'Diagnóstico Médico',
  description: 'Diagnóstico Page',
}
export default function DiagnosticoLayout({
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