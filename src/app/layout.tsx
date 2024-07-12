import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./Header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Help A Dev",
  description: "Application to help in Program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <Header />

          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
