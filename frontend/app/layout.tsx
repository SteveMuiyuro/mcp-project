import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "MCP Product Template",
  description: "Assessment-ready full-stack template for an MCP-based AI product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

