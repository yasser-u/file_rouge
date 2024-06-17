import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../styles/globals.css";
import { Query } from "appwrite";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import HeaderAvConnexion from "@/components/personaliser/HeaderAvConnexion";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr" >
      <body className="flex flex-col h-full ${inter.className}">
      <QueryProvider>
          <header className="">
              <HeaderAvConnexion/>
          </header>

          <div className="flex-grow overflow-auto h-full">
              {children}
          </div>

          <Toaster />
      </QueryProvider>
      </body>
      </html>
  );
}
