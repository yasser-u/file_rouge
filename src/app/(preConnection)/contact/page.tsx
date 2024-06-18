"use client";
import {FormEvent, useState} from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";


export default function Page() {
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
                        <div className="grid w-full items-center gap-5 text-black">
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
                    <Button className="w-24">Connexion</Button>
                    <Button className="w-24" variant="destructive">Annuler</Button>

                </CardFooter>
            </Card>
        </div>


    );
}