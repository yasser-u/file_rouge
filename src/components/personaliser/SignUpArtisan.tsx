import {Button} from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { signupArtisan } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import {
    useCreateArtisanAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import {createArtisanAccount} from "@/lib/appwrite/api";

interface SignUpArtisanProps {
    resetType: () => void;
}
const SignUpArtisan: React.FC<SignUpArtisanProps>  = ({ resetType }) => {
  // initialize
  const router = useRouter();
  const { mutateAsync: createArtisanAccount, isPending: isCreatingAccount } =
      useCreateArtisanAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupArtisan>>({
    resolver: zodResolver(signupArtisan),
    defaultValues: {
      name: "",
      username: "",
      categorie_activite: "",
      adresse: "",
      code_postal: "",
      ville: "",
      telephone: "",
      email: "",
      password: "",
    },

  });

  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof signupArtisan>) {
  // create a user and authenticate
  const result = await createArtisanAccount(values);

 if (result.status && result.status === 'error') {
     // show error message
     return toast({
         title: "Sign up or sign in failed. Try again.",
     });
 } else {
     // reset form and redirect to home page
     form.reset();
     router.push("/accueil");
 }
}

  return (
  <>
    <Form {...form}>
      <div className="h-full w-full flex-col flex-center p-10">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Nom de l'entreprise" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Pseudonyme ?" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          <FormField
            control={form.control}
            name="categorie_activite"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Catégorie d'activité" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Adresse" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code_postal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Code Postal" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ville"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Ville" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Téléphone" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                            <Input type="password" placeholder="Mot de passe" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

          <div className="flex justify-evenly">
            <Button onClick={() => { resetType(); router.push('/sign-up'); }} className="buttonVariants({ variant: 'outline' }) min-w-40">
                Annuler
            </Button>

            <div className="flex flex-col items-start">
                <Button type="submit" className="shad-button_primary min-w-40">
                    {isCreatingAccount ? (
                        <div className="flex-center gap-2">
                            <Loader /> loading...
                        </div>
                    ) : (
                        "Sing up"
                    )}
                </Button>

                <p className="text-small-regular text-light-2 text-center mt-1 text-white">
                    Déjà inscrit ?
                </p>
            </div>
          </div>
        </form>
      </div>
    </Form>
  </>
);

  // return (
  //   <>
  //     <Form {...form}>
  //       <div className="h-full w-full flex-col flex-center p-10">
  //         <form
  //           onSubmit={form.handleSubmit(onSubmit)}
  //           className="flex flex-col gap-5 w-full mt-4"
  //         >
  //           <FormField
  //             control={form.control}
  //             name="name"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormControl>
  //                   <Input type="text" placeholder="Nom" className="shad-input" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //
  //           <FormField
  //             control={form.control}
  //             name="username"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormControl>
  //                   <Input type="text" placeholder="Prénom" className="shad-input" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //
  //           <FormField
  //             control={form.control}
  //             name="email"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormControl>
  //                   <Input type="email" placeholder="Email" className="shad-input" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //
  //           <FormField
  //             control={form.control}
  //             name="password"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormControl>
  //                   <Input type="password" placeholder="Mot de passe" className="shad-input" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //             <div className="flex justify-evenly">
  //                 <Button onClick={() => { resetType(); router.push('/sign-up'); }} className="buttonVariants({ variant: 'outline' }) min-w-40">
  //                     Annuler
  //                 </Button>
  //
  //                 <div className="flex flex-col items-start">
  //                     <Button type="submit" className="shad-button_primary min-w-40">
  //                         {isCreatingAccount ? (
  //                             <div className="flex-center gap-2">
  //                                 <Loader /> loading...
  //                             </div>
  //                         ) : (
  //                             "Sing up"
  //                         )}
  //                     </Button>
  //
  //                     <p className="text-small-regular text-light-2 text-center mt-1 text-white">
  //                         Déjà inscrit ?
  //                     </p>
  //                 </div>
  //             </div>
  //         </form>
  //       </div>
  //     </Form>
  //   </>
  // );
};

export default SignUpArtisan;