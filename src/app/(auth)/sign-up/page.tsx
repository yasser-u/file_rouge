"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import Link from "next/link";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/navigation";

export const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupValidation>) {
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

      router.push("/");
    } else {
      return toast({ title: "Sign in failed. Try again." });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420  flex-col bg-gray-400 flex-center p-10">
        <Image
          className="mx-auto"
          src="/assets/images/logo.svg"
          alt="logo"
          width={500}
          height={500}
        />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          {" "}
          To use snapgram, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                <FormLabel>Passeword</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> loading...
              </div>
            ) : (
              "Sing up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account ?
            {/* <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1 "
            >
              Log in
            </Link> */}
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Page;
