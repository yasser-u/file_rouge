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
import { toast } from "../ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";

interface SignUpParticulierProps {
    resetType: () => void;
}

const SignUpParticulier: React.FC<SignUpParticulierProps>  = ({ resetType }) => {
  // initialize
  const router = useRouter();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupParticulier>>({
    resolver: zodResolver(signupParticulier),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupParticulier>) {
    // create a user
    const newUser = await createUserAccount(values);

    // toaster in case the creation of account fail
    if (!newUser) {
      return toast({
        title: "Sign up failed. Try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    // toaster in case the signing fail
    if (!session) {
      return toast({
        title: "Sign in failed. Try again.",
      });
    }

    // const isLoggedIn = await checkAuthUser();

    // if (isLoggedIn) {
    //   form.reset();

    //   navigate("/");
    // } else {
    //   return toast({ title: "Sign in failed. Try again." });
    // }

    // FIXME: remove this block when the checkAuthUser function is implemented
    if (newUser) {
      form.reset();

      router.push("/accueil");
    } else {
      return toast({ title: "Sign in failed. Try again." });
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
};

export default SignUpParticulier;
