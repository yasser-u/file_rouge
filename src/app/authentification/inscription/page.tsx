export default function Page() {

    <div className="divInscription">   
    
    <h2>Inscription</h2>
    <form>
      <div>
        <label className="labelNomInscription" htmlFor="register-username">Nom :</label>
        <input className="InputNomInscription" type="text" id="register-username" value="...."  required />
      </div>
      <div>
        <label className="labelEmailInscription" htmlFor="register-email">Email :</label>
        <input className="InputEmailInscription" type="email" id="register-email" value="...." required />
      </div>
      <div>
        <label className="labelMDPInscription" htmlFor="register-password">Mot de passe :</label>
        <input className="InputMDPInscription" type="password" id="register-password2" value="...." required />
        <label className="labelMDPInscription2" htmlFor="register-password">Confirmer le mot de passe :</label>
        <input className="InputMDPInscription2" type="password" id="register-password2" value="...." required />
      </div>
      <div>
        <label className="labelSiretInscription" htmlFor="register-siret">Numero Siret :</label>
        <input className="InputSiretInscription" type="text" id="register-siret" value="...." required />
      </div>
      <div>
        <label className="labelAdresseInscription" htmlFor="register-adresse">Adresse :</label>
        <input className="InputAdresseInscription" type="text" id="register-adresse" value="...." required />
      </div>
      <button className="BtnAdresseInscription" type="submit">Inscription</button>
    </form>
  </div>
}