import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="divConnexion">
      <h2>Connexion</h2>
      <form>
        <div>
          <label className="labelConnexion" htmlFor="username">
            Nom d&apos;utilisateur:
          </label>
          <input
            className="inputConnexion"
            type="text"
            id="username"
            required
          />
        </div>
        <div>
          <label className="labelMDP" htmlFor="password">
            Mot de passe:
          </label>
          <input
            className="inputMDP"
            type="password"
            id="password"
            required
          />
        </div>
        <Button className="BtnConnexion" type="submit">
          Connexion
        </Button>
        {/* <ButtonConnexion type="submit" className="BtnConnexion">
          Connexion
        </ButtonConnexion> */}
      </form>
    </div>
  );
}
