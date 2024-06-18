"use client";
import {useGetAllProductsInfiniteQuery} from "@/lib/react-query/queriesAndMutations";
import React from "react";
import {IProductWithCreator} from "@/types";
import {CardPublication} from "@/components/personaliser/CardPublication";
import SearchBar from "@/components/personaliser/SearchBar";

export default function Page() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useGetAllProductsInfiniteQuery();

    const products = data?.pages.flatMap(page => page.products) || [];

    return (
        <div className="flex h-screen ">
            <div className="h-full  text-center w-1/5 "> </div>
            <div className="h-full flex flex-col flex-grow  gap-3 text-center pt-10 w-3/5 ">
                <div className="w-full">
                    <SearchBar/>
                </div>
                {status === 'pending' && <div>Loading...</div>}
                {status === 'error' && <div>Error loading products</div>}
                {status === 'success' && products.map((product, index) => {
                    const iProduct: IProductWithCreator = {
                        id: product.id,
                        nom: product.nom,
                        description: product.description,
                        createur: product.createur,
                        imagesUrl: product.imagesUrl,
                        avatar: product.avatar,
                    };

                    return (
                        <div key={index}>
                            <CardPublication product={iProduct}/>
                        </div>
                    );
                })}
                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                    </button>
                )}
            </div>
            <div className="h-full  text-white text-center w-1/5 "></div>
        </div>
    );
}