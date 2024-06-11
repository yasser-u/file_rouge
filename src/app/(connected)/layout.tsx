"use client";

import "../../../styles/globals.css";
import MenuArtisan from "@/components/personaliser/MenuArtisan";
import {QueryProvider} from "@/lib/react-query/QueryProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
        <QueryProvider>
            <div className="flex flex-row  h-full">
                <div className="text-center w-1/5" style={{ backgroundColor: 'var(--background)', color: 'var(--card-foreground)' }}>
                    <MenuArtisan />
                </div>
                <div className="text-center w-3/5">
                    <div className="bg-violet-950  text-white h-[8%] max-h-[105px]" style={{ backgroundColor: 'var(--background)', color: 'var(--card-foreground)' }}> barre de recherche </div>
                    <div className="overflow-y-auto h-[92%]">{children}</div>
                </div>
                <div className="bg-violet-950 text-white text-center w-1/5" style={{ backgroundColor: 'var(--background)', color: 'var(--card-foreground)' }}>droite</div>
            </div>
        </QueryProvider>
        </body>
    </html>
  )
}