
"use client";

export default function Page() {


    return (
        <div className="container mx-auto px-4 overflow-auto ">
            <h1 className="text-3xl font-bold mb-4">Mentions légales</h1>
            <p className="mb-4">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous fournissons les informations légales suivantes :</p>

            <h2 className="text-2xl font-bold mb-2">Éditeur du site</h2>
            <p className="mb-4">
                LinkArt SAS<br />
                123 rue de l'Artisanat, 67000 Strasbourg<br />
                Capital social : 10 000 €<br />
                RCS Strasbourg : 123 456 789<br />
                N° TVA intracommunautaire : FR01234567890
            </p>

            <h2 className="text-2xl font-bold mb-2">Directeur de la publication</h2>
            <p className="mb-4">Elisa Batraeva et Yaser Safari, co-fondateurs de LinkArt.</p>

            <h2 className="text-2xl font-bold mb-2">Hébergeur du site</h2>
            <p className="mb-4">
                Vercel Inc.<br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
            </p>

            <h2 className="text-2xl font-bold mb-2">Protection des données personnelles</h2>
            <p className="mb-4">Les informations recueillies sur ce site sont nécessaires au traitement de vos demandes et sont destinées à LinkArt pour ses seuls besoins. Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification et d'opposition aux données personnelles vous concernant. Pour exercer ce droit, veuillez nous contacter via le formulaire dédié.</p>

            <h2 className="text-2xl font-bold mb-2">Propriété intellectuelle</h2>
            <p className="mb-4">L'ensemble des éléments composant ce site (textes, images, vidéos, logos, etc.) sont la propriété exclusive de LinkArt ou de ses partenaires. Toute reproduction, représentation ou adaptation, partielle ou intégrale, est interdite sans autorisation préalable de LinkArt.</p>

            <h2 className="text-2xl font-bold mb-2">Loi applicable et juridiction compétente</h2>
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux de Strasbourg seront seuls compétents.</p>
        </div>
    );
}