import { Menubar } from "@/components/ui/menubar";
import exp from "constants"
import Link from "next/link"


const PageAccueil = () => {
    return (
        <>
            {/* <h1>Accueil</h1> */}

            <nav className="flex w-screen h-16 items-center fixed bg-purple-200 drop-shadow-lg">
                <ul className="flex w-11/12 justify-between ml-5">
                    <li>
                     <Link href="./contact">Contact</Link>
                    </li>
                    <div className="flex justify-center space-x-8">
                        <li>
                        <Link href="./authentification/connexion">Connexion</Link>
                        </li>
                        <li>
                        <Link href="./authentification/inscription">Inscription</Link>
                        </li>
                    </div>
                </ul>
            </nav>

            
        </>
    )
}

export default PageAccueil;