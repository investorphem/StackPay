import "./globals.css";

export const metadata = {
  title: "StackPay",
  description: "Decentralized payroll on Stacks",
  other: {
    "talentapp:project_verification":
      "ff303461f04a69dca470014c10ec0b28fbbe74185adadcee38671c25a61d5a9eb9bd5c5a19cde52c9b3ee32dd2aa9f375f446f08d690c3f8890ed885ef66bb64",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}