import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { IProductWithCreator} from "@/types";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function CardPublication({ product }: { product: IProductWithCreator }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-[70%]  ">
                <span className="w-[50%] flex items-center gap-3 rounded-3xl bg-[#9B6EAD] text-[#FFE8AC]">
                    <Avatar className=" border-2">
                    <AvatarImage src={product.avatar} />
                    <AvatarFallback className="text-[#330247]">{product.createur}</AvatarFallback>
                </Avatar>
                <span> {product.createur}</span>
                </span>

            </div>
            <Card className="w-[70%] h-[420px] p-0 ">
                <CardHeader >
                    <CardTitle>{product.nom}</CardTitle>
                </CardHeader>
                <CardContent className="p-1 flex flex-col justify-end">
                    <div className="flex flex-col  gap-1 w-full h-2/5">
                        <img className="rounded-3xl max-h-[250px]" src={product.imagesUrl} alt="product image"/>
                    </div>
                    <div className="text-left h-2/5">
                        <h3> Description :</h3>
                        {product.description}

                    </div>
                    <div className="flex justify-end h-1/5">
                        <img className="rounded-3xl h-[24px]" src="/assets/icons/like.svg" alt="product image"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}