import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'
import SideNav from './(site)/components/SideNav'

const inter = Inter({ subsets: ['latin'] })

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'OwnSpace',
  description: 'My safe OwnSpace',
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <SideNav />
          <div className="p-4 sm:ml-64 bg-base-100">
            <div className="p-4">
              {children}
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  )
}
