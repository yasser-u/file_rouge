"use client";
import React, { useState, useEffect } from 'react';
import {Produit} from "@/components/personaliser/Produit";
import {CardProduit} from "@/components/personaliser/CardProduit";
import {useGetCurrentUserMutation, useGetProductsByCreatorMutation} from "@/lib/react-query/queriesAndMutations";
import {IProduct} from "@/types";

export default function Page() {
    const [creatorId, setCreatorId] = useState("");
    const { data: user, isLoading: isUserLoading } = useGetCurrentUserMutation();

    useEffect(() => {
        if (user) {
            console.log("artisanId = " + JSON.stringify(user.artisanId));
            setCreatorId(user.artisanId);
        }
    }, [user]);

    const { data: products, isLoading } = useGetProductsByCreatorMutation(creatorId);

    if (isLoading || isUserLoading) {
        return <div>Loading...</div>;
    }

    return (

        <div className="  h-[100%]">
            <div className="flex justify-evenly items-center bg-violet-950  text-white min-h-[8%] max-h-[105px]"
                 style={{backgroundColor: 'var(--background)', color: 'var(--card-foreground)'}}>
                <h1>Liste de mes produits</h1>
                {user && <Produit creatorId={user.artisanId}/>}
            </div>
            <div className="flex flex-col  gap-5 m-2 ">
                <div className="product-grid">
                    {products?.documents.map((product) => {
                        const mappedProduct: IProduct = {
                            id: product.$id,
                            nom: product.nom,
                            description: product.description,
                            tags: product.tags,
                            createur: product.createur,
                            imagesUrl: product.imagesUrl,
                            imageIds: product.imagesId,
                        };
                        return <CardProduit key={product.$id} product={mappedProduct}/>
                    })}
                </div>

            </div>
        </div>

    );
}