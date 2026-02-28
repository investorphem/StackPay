import "./globals.css";

export const metadata = {
  title: "StackPay",
  description: "Decentralized payroll on Stacks",

  openGraph: {
    title: "StackPay",
    description: "Decentralized payroll on Stacks",
    url: "https://stackpay-one.vercel.app",
    siteName: "StackPay",
    images: [
      {
        url: "/og-image.png", // Put your image URL here
        width: 1200,
        height: 630,
        alt: "StackPay - Decentralized payroll on Stacks",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "StackPay",
    description: "Decentralized payroll on Stacks",
    images: ["/og-image.png"], // Same image
  },

  icons: {
    icon: "/favicon.ico",
  },

  other: {
    "talentapp:project_verification":
      "ff303461f04a69dca470014c10ec0b28fbbe74185adadcee38671c25a61d5a9eb9bd5c5a19cde52c9b3ee32dd2aa9f375f446f08d690c3f8890ed885ef66bb64",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}