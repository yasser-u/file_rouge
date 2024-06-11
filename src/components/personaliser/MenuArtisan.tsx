import React from 'react';
import Link from 'next/link';

const SideMenu = () => {
  return (
    <div className=" h-full fixed left-0 top-0 flex flex-col items-center gap-20 p-5" >
      <div>
        <img src="/assets/logos/logo_noir_2_1.svg"
             alt="logo"
             className="w-29 h-12" />
      </div>
      <nav>
        <ul className="space-y-4 text-left">
          <li>
            <Link className="flex gap-4" href="/accueil">
              <img src="/assets/icons/home_icon.svg" alt="home" className="w-6 h-6" />
              Accueil
            </Link>
          </li>
          <li>
            <Link className="flex gap-4" href="/produits">
              <img src="/assets/icons/mon_site.svg" alt="home" className="w-6 h-6"/>
              Mes produits
            </Link>
          </li>
          <li>
            <Link className="flex gap-4" href="/messages">
              <img src="/assets/icons/message_icon.svg" alt="home" className="w-6 h-6"/>
              Messages</Link>
          </li>
          <li>
            <Link className="flex gap-4" href="/calendrier">
              <img src="/assets/icons/calendrier.svg" alt="home" className="w-6 h-6"/>
              Calendrier</Link>
          </li>
          <li>
            <Link className="flex gap-4" href="/notifications">
              <img src="/assets/icons/notif_icon.svg" alt="home" className="w-6 h-6"/>
              Notifications</Link>
          </li>
          <li>
            <Link className="flex gap-4" href="/mon_reseau">
              <img src="/assets/icons/mon_reseau.svg" alt="home" className="w-6 h-6"/>
              Mon réseau</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;