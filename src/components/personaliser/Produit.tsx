// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useAddProductWithFilesMutation } from "@/lib/react-query/queriesAndMutations";
// import {IProduct} from "@/types";
//
//
// // add ou edit produit
// export function Produit({ product, creatorId }: { product?: IProduct, creatorId?: string  }) {
//     const [nom, setNom] = useState("");
//     const [Description, setDescription] = useState("");
//     const [tags, setTags] = useState("");
//     const [file, setFile] = useState<File>();
//     const [isOpen, setIsOpen] = useState(false);
//     const { mutate, data, isSuccess } = useAddProductWithFilesMutation();
//
//     useEffect(() => {
//         if (product) {
//             setDescription(product.description);
//             setTags(product.tags);
//             // Ici, vous devez également définir les fichiers si vous les avez
//         }
//     }, [product]);
//
//     useEffect(() => {
//         if (isSuccess) {
//             console.log("onSuccess was triggered");
//             setIsOpen(false);
//         }
//     }, [data, isSuccess]);
//
//
//     const handleSave = () => {
//         if (product) {
//             // Call API to update product
//             console.log("Update product");
//         } else {
//             // Call API to add product
//             if (file) { // Check if file is defined
//                 mutate({
//                     product: {
//                         nom: nom,
//                         description: Description,
//                         tags: tags,
//                         createur: creatorId,
//                     },
//                     file: file,
//                 });
//             } else {
//                 console.error("No file selected");
//             }
//         }
//     };
//
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFile(event.target.files[0]);
//         }
//     };
//
//     return (
//
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//                 <Button variant="secondary">{product ? "Modifier le produit" : "Ajouter"}</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>{product ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
//                     <DialogDescription>
//                         {product ? "Faites des modifications à votre produit ici. Cliquez sur enregistrer lorsque vous avez terminé." : "Ajoutez un nouveau produit ici. Cliquez sur enregistrer lorsque vous avez terminé."}
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4 ">
//                         <Label htmlFor="nom" className="text-right">
//                             Nom
//                         </Label>
//                         <Input
//                             id="nom"
//                             value={nom}
//                             onChange={e => setNom(e.target.value)}
//                             className="col-span-3 text-black"
//                         />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="Description" className="text-right">
//                             Description
//                         </Label>
//                         <Input
//                             id="Description"
//                             value={Description}
//                             onChange={e => setDescription(e.target.value)}
//                             className="col-span-3 text-black"
//                         />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="tags" className="text-right">
//                             Tags
//                         </Label>
//                         <Input
//                             id="tags"
//                             value={tags}
//                             onChange={e => setTags(e.target.value)}
//                             className="col-span-3 text-black"
//                         />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="file" className="text-right">
//                             Fichier
//                         </Label>
//                         <Input
//                             id="file"
//                             type="file"
//                             multiple
//                             onChange={handleFileChange}
//                             className="col-span-3 text-black"
//                         />
//                     </div>
//                 </div>
//                 <DialogFooter className="flex sm:justify-center">
//                     <Button className="w-[130px]" variant="destructive" onClick={() => setIsOpen(false)}>Annuler</Button>
//                     <Button className="w-[130px]" type="submit" onClick={handleSave}>Enregistrer</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//
//     )
// }

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAddProductWithFilesMutation } from "@/lib/react-query/queriesAndMutations";
import {IProduct} from "@/types";


// add ou edit produit
export function Produit({ product, creatorId }: { product?: IProduct, creatorId?: string  }) {
    const [nom, setNom] = useState("");
    const [Description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState<File>();
    const [isOpen, setIsOpen] = useState(false);
    const { mutate, data, isSuccess } = useAddProductWithFilesMutation();

    useEffect(() => {
        if (product) {
            setNom(product.nom);
            setDescription(product.description);
            setTags(product.tags);
            setIsOpen(true); // Open the Dialog
        }
    }, [product]);

    useEffect(() => {
        if (isSuccess) {
            console.log("onSuccess was triggered");
            setIsOpen(false);
        }
    }, [data, isSuccess]);


    const handleSave = () => {
        if (product) {
            // Call API to update product
            console.log("Update product");
        } else {
            // Call API to add product
            if (file && creatorId) { // Check if file and creatorId are defined
                mutate({
                    product: {
                        nom: nom,
                        description: Description,
                        tags: tags,
                        createur: creatorId,
                    },
                    file: file,
                });
            } else {
                console.error("No file selected or creatorId is not defined");
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {product ? null : (
                <DialogTrigger asChild>
                    <Button variant="secondary">Ajouter</Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product ? "Modifier le produit" : "Ajouter un produit"}</DialogTitle>
                    <DialogDescription>
                        {product ? "Faites des modifications à votre produit ici. Cliquez sur enregistrer lorsque vous avez terminé." : "Ajoutez un nouveau produit ici. Cliquez sur enregistrer lorsque vous avez terminé."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4 ">
                        <Label htmlFor="nom" className="text-right">
                            Nom
                        </Label>
                        <Input
                            id="nom"
                            value={nom}
                            onChange={e => setNom(e.target.value)}
                            className="col-span-3 text-black"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="Description"
                            value={Description}
                            onChange={e => setDescription(e.target.value)}
                            className="col-span-3 text-black"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tags" className="text-right">
                            Tags
                        </Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            className="col-span-3 text-black"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            Fichier
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="col-span-3 text-black"
                        />
                    </div>
                </div>
                <DialogFooter className="flex sm:justify-center">
                    <Button className="w-[130px]" variant="destructive" onClick={() => setIsOpen(false)}>Annuler</Button>
                    <Button className="w-[130px]" type="submit" onClick={handleSave}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}