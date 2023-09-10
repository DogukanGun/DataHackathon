import CustomNavbar from '@/components/navbar/Navbar'
import '../styles/globals.css'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CustomNavbar />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
