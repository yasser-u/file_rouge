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
import {signupParticulier} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import {
    useCreateUserAccountMutation,
    useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";

interface SignUpParticulierProps {
    resetType: () => void;
}

const SignUpParticulier: React.FC<SignUpParticulierProps>  = ({ resetType }) => {
    const router = useRouter();
    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
        useCreateUserAccountMutation();
    const { mutateAsync: signInAccount, isPending: isSigningIn } =
        useSignInAccountMutation();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signupParticulier>>({
        resolver: zodResolver(signupParticulier),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof signupParticulier>) {
        try {
            await createUserAccount(values);
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
                    title: "Une erreur s'est produite lors de l'inscription",
                    description: error.message,
                });
            }
        }
    }

  return (
    <>
        {isCreatingAccount ? (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        ) : (
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
                    <Input type="text" placeholder="Nom" className="shad-input" {...field} />
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
                    <Input type="text" placeholder="Prénom" className="shad-input" {...field} />
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
                      <Button type="submit" className="shad-button_primary min-w-40"> Sing up </Button>
                      <p className="text-small-regular text-light-2 text-center mt-1 text-white">
                          Déjà inscrit ?
                      </p>
                  </div>
              </div>
          </form>
        </div>
      </Form>
        )}
    </>
  );
};

export default SignUpParticulier;
