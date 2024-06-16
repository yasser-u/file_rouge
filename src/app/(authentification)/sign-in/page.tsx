"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { signinValidation } from "@/lib/validation";
import Link from "next/link";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: signInAccount } = useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signinValidation>>({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinValidation>) {
    try {
      await signInAccount({
        email: values.email,
        password: values.password,
      });
      form.reset();
      router.push("/accueil");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Une erreur s'est produite lors de la connexion",
          description: error.message,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-col flex-center p-10 h-full w-full justify-center">

        <h1 className="text-2xl text-center mt-5 custom-title pb-8">Connexion</h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Passeword" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center justify-evenly">
            <Button type="submit" className="shad-button_primary min-w-64">
              Connexion
            </Button>
            <p className="text-small-regular text-light-2 text-white mb-3">
              <Link href="/sign-up" passHref>
                <span
                    className="text-primary-500 text-small-semibold ml-1 cursor-pointer">Vous n'avez pas de compte ?</span>
              </Link>
            </p>
            <Button onClick={() => router.back()} className="shad-button_primary min-w-64">
              Annuler
            </Button>
          </div>

        </form>
      </div>
    </Form>
);
};

export default Page;
