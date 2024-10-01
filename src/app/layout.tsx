import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./TopNav";

export const metadata: Metadata = {
  title: "What do we eat?",
  description: "A simple app to keep track of what we need to buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
