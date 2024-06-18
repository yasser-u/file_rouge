"use client";
import React from 'react';
import {CardPublication} from "@/components/personaliser/CardPublication";
import { useGetAllProductsInfiniteQuery } from '@/lib/react-query/queriesAndMutations';
import { IProductWithCreator} from "@/types";
import SearchBar from "@/components/personaliser/SearchBar";

const PageAccueil = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetAllProductsInfiniteQuery();

  const products = data?.pages.flatMap(page => page.products) || [];

  return (
      <div className="h-full">
          <div className="bg-violet-950  text-white min-h-[8%] max-h-[105px] p-3"
               style={{backgroundColor: 'var(--background)', color: 'var(--card-foreground)'}}>
              <SearchBar />
          </div>
          <div className="overflow-y-auto h-[92%] flex flex-col gap-5 pt-3">
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
                        <CardPublication product={iProduct} />
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
      </div>
  );
};

export default PageAccueil;