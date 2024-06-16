import Link from "next/link";

const PageAccueil = () => {
  return (
        <div className="h-full">
            <div className="bg-violet-950  text-white min-h-[8%] max-h-[105px]"
                 style={{backgroundColor: 'var(--background)', color: 'var(--card-foreground)'}}> Barre de recherche </div>
            <div className="overflow-y-auto h-[92%]">
                <h1>Accueil</h1>
            </div>

        </div>
  );
};

export default PageAccueil;
