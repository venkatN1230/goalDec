import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { RoleProvider } from "@/lib/RoleContext";
import { AuthProvider } from "@/lib/AuthContext";
import AuthWrapper from "@/components/AuthWrapper";
import ClickEffect from "@/components/ClickEffect";
import AIChatBot from "@/components/AIChatBot";

export const metadata: Metadata = {
  title: "Nexis Core | GoalSync AI System",
  description: "Enterprise Performance Management & Quantum Alignment Portal for Nexis Core operatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.className} text-foreground antialiased min-h-screen relative`}
        style={{
          backgroundImage: "url('/background.jpg'), linear-gradient(to bottom, rgba(11, 17, 32, 0.85), rgba(11, 17, 32, 0.95))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay"
        }}
      >
        <ClickEffect />
        <RoleProvider>
          <AuthProvider>
            <AuthWrapper>
              {children}
            </AuthWrapper>
            <AIChatBot />
          </AuthProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
