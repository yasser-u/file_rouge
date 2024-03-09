// import { Menubar } from "@/components/ui/menubar";
// import exp from "constants";
import Link from "next/link";

const PageAccueil = () => {
  return (
    <>
      {/* <h1>Accueil</h1> */}

      <nav className="flex w-screen h-16 items-center fixed bg-purple-200 drop-shadow-lg">
        <ul className="flex w-11/12 justify-between ml-5">
          <li>
            <Link href="./contact">Contact</Link>
          </li>
          <li>
            <Link href="./about">artisans</Link>
          </li>
          <div className="flex justify-center space-x-8">
            <li>
              <Link href="/sign-in">Connexion</Link>
            </li>
            <li>
              <Link href="./sign-up">Inscription</Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default PageAccueil;
