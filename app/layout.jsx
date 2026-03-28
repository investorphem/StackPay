import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import ConnectWallet from "../components/ConnectWallet";
import ThemeToggle from "../components/ThemeToggle"; 
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StackPay | Premium STX Payroll",
  description: "Real-time decentralized payroll and streaming on the Stacks blockchain.",
  metadataBase: new URL("https://stackpay-one.vercel.app"),

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "StackPay",
    description: "Decentralized payroll on Stacks",
    url: "https://stackpay-one.vercel.app",
    siteName: "StackPay",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "StackPay" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackPay",
    images: ["/og-image.png"],
  },
  other: {
    "talentapp:project_verification": "ff303461f04a69dca470014c10ec0b28fbbe74185adadcee38671c25a61d5a9eb9bd5c5a19cde52c9b3ee32dd2aa9f375f446f08d690c3f8890ed885ef66bb64",
  },
};

export default function RootLayout({ children }) {
  return (
    // FIX 1: Removed hardcoded className="dark" so the ThemeToggle can actually control it.
    // Added suppressHydrationWarning to prevent React errors when injecting the theme client-side.
    <html lang="en" suppressHydrationWarning>
      {/* FIX 2: Added base light/dark colors to the body */}
      <body className={`${inter.className} antialiased selection:bg-purple-500/30 bg-white dark:bg-gray-950 transition-colors duration-300`}>
        
        {/* Global Navigation */}
        {/* FIX 3: Added light mode backgrounds and borders */}
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-200 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/70 backdrop-blur-xl transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

            <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 relative">
                 <Image 
                   src="/logo.png" 
                   alt="StackPay Logo" 
                   fill 
                   className="object-contain"
                   priority
                 />
              </div>
              <div className="hidden sm:block">
                {/* FIX 4: Text flips to dark gray in light mode, white in dark mode */}
                <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-none transition-colors duration-300">StackPay</h1>
                <span className="text-[10px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold transition-colors duration-300">Mainnet Protocol</span>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Link href="/dashboard" className="hover:text-purple-600 dark:hover:text-white transition-colors">Employer</Link>
                <Link href="/withdraw" className="hover:text-purple-600 dark:hover:text-white transition-colors">Employee</Link>
              </div>
              <ConnectWallet />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-24 min-h-screen">
          {children}
        </main>

        {/* Footer */}
        {/* FIX 5: Added light mode backgrounds and borders to the footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-gray-950/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">

              <div className="text-center md:text-left">
                <p className="text-gray-900 dark:text-gray-400 text-sm font-medium uppercase tracking-widest transition-colors duration-300">© 2026 MASONODE Organisation</p>
                <p className="text-gray-500 dark:text-gray-600 text-xs mt-1 italic transition-colors duration-300">All rights reserved. Secured by Bitcoin.</p>
              </div>

              <ThemeToggle />
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-gray-500 text-[11px] uppercase tracking-tighter pt-8 border-t border-gray-200 dark:border-gray-900 transition-colors duration-300">
              <Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <a href="https://github.com/investorphem" target="_blank" rel="noreferrer" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Documentation</a>
              <Link href="/support" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Support</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
