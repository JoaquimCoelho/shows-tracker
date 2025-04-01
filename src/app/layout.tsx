import "./globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import { ReactNode } from "react";
import { NavBar } from "@/app/components/navbar";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "show tracker",
  description: "Website to track your watched shows",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await stackServerApp.getUser();

  return (
    <html lang="en" className=" bg-[#0a0a0a]">
      <body className="min-h-screen">
        <StackProvider app={stackServerApp}>
          <ThemeProvider defaultTheme="dark" attribute="class">
          <StackTheme>
            <NavBar loggedIn={!!user}/>
            <main className="container mx-auto p-4">{children}</main>
          </StackTheme>
          </ThemeProvider>
        </StackProvider>
      </body>
    </html>
  );
}
