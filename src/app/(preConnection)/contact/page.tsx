"use client";
import {FormEvent, useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";


export default function page() {
    const [formState, setFormState] = useState({ nom: '', email: '', sujet: '', message: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log(formState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex h-full w-full justify-center items-center">
            <Card className="w-[893px] rounded-3xl p-10">
                <CardHeader className="text-center">
                    <CardTitle>Nous contacter</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-5">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="name" placeholder="Nom" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="name" placeholder="E-mail" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input  id="name" placeholder="Sujet" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Textarea  id="name" placeholder="Message" />
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col justify-between gap-4">
                    <Button>Connexion</Button>
                    <Button variant="outline">Annuler</Button>

                </CardFooter>
            </Card>
        </div>

        // <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
        //     <h2 className="text-2xl font-bold mb-6 text-center">Nous contacter</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div className="mb-4">
        //             <label htmlFor="nom" className="block font-bold mb-1">
        //                 Nom
        //             </label>
        //             <input
        //                 type="text"
        //                 id="nom"
        //                 name="nom"
        //                 onChange={handleChange}
        //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label htmlFor="email" className="block font-bold mb-1">
        //                 E-mail
        //             </label>
        //             <input
        //                 type="email"
        //                 id="email"
        //                 name="email"
        //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label htmlFor="sujet" className="block font-bold mb-1">
        //                 Sujet
        //             </label>
        //             <input
        //                 type="text"
        //                 id="sujet"
        //                 name="sujet"
        //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label htmlFor="message" className="block font-bold mb-1">
        //                 Message
        //             </label>
        //             <textarea
        //                 id="message"
        //                 name="message"
        //                 rows={4}
        //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //             ></textarea>
        //         </div>
        //         <div className="text-right">
        //             <button
        //                 type="submit"
        //                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        //             >
        //                 Connexion
        //             </button>
        //             <button
        //                 type="reset"
        //                 className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        //             >
        //                 Annuler
        //             </button>
        //         </div>
        //     </form>
        // </div>


    );
}