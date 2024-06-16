import React from 'react';
import Link from 'next/link';

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {IUser} from "@/types";

interface ProfileMenuProps {
    currentUser: IUser | null;
}

const ProfileMenu: React.FC<ProfileMenuProps>  = ({currentUser}) => {

    return (
        currentUser ?
            <div className="  flex flex-col  gap-20 mt-10" >
                <div className="flex flex-col items-center gap-5">
                    <Avatar className="h-36 w-36 border-2">
                        <AvatarImage src={currentUser?.imageUrl} />
                        <AvatarFallback className="text-[#330247]">{currentUser?.username}</AvatarFallback>
                    </Avatar>
                    <span>{currentUser?.name}</span>
                </div>
                <nav className="flex flex-col justify-between ">
                    <ul className="flex flex-col gap-5">
                        <li>
                            <Link className="flex justify-center items-center gap-3" href="/mes_favoris">
                                <img src="assets/icons/liked.svg" alt="home" className="w-5 h-5"/>
                                Favoris
                            </Link>
                        </li>
                        <li>
                            <Link href="/posts">
                                Mes publications
                            </Link>
                        </li>
                        <li>
                            <Link className="flex justify-center items-center gap-3" href="/produits">
                                <img src="/assets/icons/profil.svg" alt="home" className="w-5 h-5"/>
                                Mon profil
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            : <div>Vous n'êtes pas connecté</div>
    );
};

export default ProfileMenu;