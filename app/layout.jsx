import "./globals.css";
import ConnectWallet from "../components/ConnectWallet";
import { Inter } from "next/font/google"; // Premium typography

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StackPay | Premium STX Payroll",
  description: "Real-time decentralized payroll and streaming on the Stacks blockchain.",
  metadataBase: new URL("https://stackpay-one.vercel.app"),
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
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {/* Premium Global Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-800/50 bg-gray-950/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="font-black text-white text-xl">S</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">StackPay</h1>
                <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold">Mainnet Protocol</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                <a href="/dashboard" className="hover:text-white transition-colors">Employer</a>
                <a href="/withdraw" className="hover:text-white transition-colors">Employee</a>
              </div>
              <ConnectWallet />
            </div>
          </div>
        </nav>

        {/* Content wrapper with padding for the fixed nav */}
        <main className="pt-24 min-h-screen">
          {children}
        </main>

        {/* Subtle Footer for Mainnet Transparency */}
        <footer className="py-12 border-t border-gray-900 bg-gray-950/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
            <p>© 2026 StackPay Protocol. Secured by Bitcoin.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Smart Contract</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
