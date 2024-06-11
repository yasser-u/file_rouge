"use client";
import React, { useState, useEffect } from 'react';
import {Produit} from "@/components/personaliser/Produit";
import {CardProduit} from "@/components/personaliser/CardProduit";
import { useGetProductsByCreatorMutation } from "@/lib/react-query/queriesAndMutations";
import { getCurrentUser } from "@/lib/appwrite/api";
import {IProduct} from "@/types";

export default function Page() {
    const [showDialog, setShowDialog] = useState(false);
    const [creatorId, setCreatorId] = useState("65f575ac90711472842d");
    const { data: products, isLoading } = useGetProductsByCreatorMutation(creatorId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col  gap-5 m-2 ">
            <div className="flex justify-evenly items-center">
                <h1>Liste de mes produits</h1>
                <Produit/>
            </div>
            <div className="product-grid">
                {products?.documents.map((product) => (
                    <CardProduit key={product.$id} product={product as unknown as IProduct} />
                ))}
            </div>

        </div>
    );
}