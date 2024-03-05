"use client";
import { useRouter } from "next/navigation";

interface Params {
  artisanId: string;
}

const Page = ({ params }: { params: Params }) => {
  const router = useRouter();
  return (
    <div className="container mt-[5vh]">
      <div className="grid grid-12 gap-4 min-h-[90vh]">
        <div>
          <button type="button" onClick={() => router.back()}>
            Click here to go back
          </button>
        </div>
        <div className="col-span-12 bg-violet-400 h-[30vh]">
          page afficher un artisan avec son artisanIdid = {params.artisanId}
          ici le profil de l'artisan
        </div>
        <div className="col-span-12 bg-gray-500 h-[60vh]">
          ici les produits de l'artisan avec un component qui liste les produits
          un beau tableau avec : - pagination - filtre par catégorie - filtre
          par disponibilité - filtre par nouveauté - scroll ?
        </div>
      </div>
    </div>
  );
};

export default Page;
