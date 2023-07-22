import './globals.scss';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';


export const metadata = {
  title: 'Margo',
  description: 'Showcase and discover projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
