import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-8 md:gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10">
                <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-stretch md:items-center py-4 px-5 md:py-3">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
                    <Link 
                      href={"/"} 
                      className="text-lg md:text-base font-semibold hover:opacity-70 transition-opacity"
                    >
                      Next.js Supabase Starter
                    </Link>
                    <DeployButton />
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex justify-center items-center">
                    {!hasEnvVars ? (
                      <EnvVarWarning />
                    ) : (
                      <div className="flex gap-4 items-center">
                        <HeaderAuth />
                      </div>
                    )}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-8 md:gap-20 w-full max-w-5xl px-4 md:px-5">
                {children}
              </div>

              <footer className="w-full flex flex-col md:flex-row items-center justify-center border-t mx-auto text-center text-xs gap-4 md:gap-8 py-8 md:py-16 px-4">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
