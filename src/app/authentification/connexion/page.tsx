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
            value="...."
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
            value="..."
            required
          />
        </div>
        <button className="BtnConnexion" type="submit">
          Connexion
        </button>
      </form>
    </div>
  );
}
