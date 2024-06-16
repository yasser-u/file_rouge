import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {IProduct} from "@/types";
import {Button} from "@/components/ui/button";
import {useDeleteProductMutation} from "@/lib/react-query/queriesAndMutations";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {Produit} from "@/components/personaliser/Produit";

export function CardProduit({ product }: { product: IProduct }) {
    // delete product
    const deleteProductMutation = useDeleteProductMutation();
    const [open, setOpen] = useState(false);
    // edit product
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    const handleDelete = () => {
        deleteProductMutation.mutate(product.id);
    };

    const onSelect = (product: IProduct) => {
        console.log("Selected product: ", product);
        setSelectedProduct(product);
    };

    return (
        <div className="flex flex-col items-center">
            <Card className="w-[200px] h-[220px] cursor-pointer" onClick={() => onSelect(product)}>
                <CardHeader>
                    <CardTitle>{product.nom}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-1 w-full">
                        <img className="rounded-3xl h-[100px]" src={product.imagesUrl} alt="product image"/>
                    </div>
                    <div className="text-left">
                        <h3> Description :</h3>
                        {product.description}
                    </div>
                </CardContent>
            </Card>

            {selectedProduct && <Produit product={selectedProduct}/>}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger><Button className="h-[20px]" variant="secondary" >Supprimer</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Êtes-vous absolument sûr ?</DialogTitle>
                        <DialogDescription>
                            Cette action ne peut pas être annulée. Cela supprimera définitivement votre produit.
                        </DialogDescription>
                    </DialogHeader>
                    <Button onClick={handleDelete}>Oui, supprimez-le.</Button>
                    <Button onClick={() => setOpen(false)}>Non, gardez-le.</Button>
                </DialogContent>
            </Dialog>
        </div>

    )
}