import Link from "next/link";

const HeaderAvConnexion = () => {
  return (
    <>
      <nav className="flex w-full h-16 items-center border-b-2 border-purple-700 bg-purple-200" style={{ boxShadow: '0px 4px 6px #7e57c269' }}>
        <ul className="flex w-11/12 justify-evenly ml-5">
          <li>
            <Link href="/">
                <img
                  src="/assets/logos/logo_noir_2_1.svg"
                  alt="logo"
                  className="w-29 h-12"
                />
            </Link>
          </li>
          <div className="flex justify-center items-center space-x-8">
            <li>
              <Link href="./about">A propos de nous</Link>
            </li>
            <li>
              <Link href="./contact">Contact</Link>
            </li>
          </div>
          <div className="flex justify-center items-center space-x-8">
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

export default HeaderAvConnexion;
