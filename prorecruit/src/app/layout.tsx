import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";

export const metadata: Metadata = {
  title: "ProRecruit - מערכת גיוס מתקדמת",
  description: "מערכת ניהול גיוס מקיפה עם AI ואוטומציה",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
