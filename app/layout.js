import "./globals.css";
import { Open_Sans } from 'next/font/google'

// Initialize the font
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

export const metadata = {
  title: "Website Portfolio",
  description: "Portfolio Web Design",
  icons: {
    icon: '/imgs/favicon.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>{children}</body>
    </html>
  );
}