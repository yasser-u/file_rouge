import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {IProduct} from "@/types";

export function CardProduit({ product }: { product: IProduct }) {
    return (
        <Card className="w-[200px]">
            <CardHeader>
                <CardTitle>{product.nom}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1 w-full">
                    <img className="rounded-3xl h-[100px]" src={product.imagesUrl} alt="product image"/>
                </div>
                <div className="text-left">
                    <h3> Description </h3>
                    {product.description}
                </div>
            </CardContent>
        </Card>
    )
}