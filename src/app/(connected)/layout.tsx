"use client";

import "../../../styles/globals.css";
import MenuArtisan from "@/components/personaliser/MenuArtisan";
import {QueryProvider} from "@/lib/react-query/QueryProvider";
import {Toaster} from "@/components/ui/toaster";
import {useEffect, useState} from "react";
import {getCurrentUser} from "@/lib/appwrite/api";
import {IUser} from "@/types";
import MenuUser from "@/components/personaliser/MenuUser";
import ProfileMenu from "@/components/personaliser/ProfileMenu";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    type User = IUser | null;
    const [currentUser, setCurrentUser] = useState<User>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
                console.log(user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

  return (
    <html lang="en">
        <body >
        <QueryProvider>
            <div className="flex flex-row h-full ">
                <div className="text-center w-1/5 border-r " style={{ backgroundColor: 'var(--background)', color: 'var(--card-foreground)' }}>
                    {currentUser && currentUser.artisanId ? <MenuArtisan /> : <MenuUser />}
                </div>
                <div className="text-center w-3/5 ">
                    <div className="overflow-y-auto h-[100%]">{children}</div>
                </div>
                <div className="bg-violet-950 text-white text-center w-1/5 border-l" style={{ backgroundColor: 'var(--background)', color: 'var(--card-foreground)' }}> <ProfileMenu currentUser={currentUser}/> </div>
            </div>
            <Toaster />
        </QueryProvider>
        </body>
    </html>
  )
}