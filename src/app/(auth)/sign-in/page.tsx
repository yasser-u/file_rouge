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
import { signinValidation } from "@/lib/validation";
import { Loader } from "lucide-react";
import Link from "next/link";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSignInAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/navigation";

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
    if (session) {
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
          Log in to ur account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          {" "}
          welcom khra, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
            Sign in
            {/* {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> loading...
              </div>
            ): "Sing in"} */}
          </Button>

          {/* <p className="text-small-regular text-light-2 text-center mt-2"> 
            Don't have an account ?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1 ">Sign in</Link>
          </p> */}
        </form>
      </div>
    </Form>
  );
};

export default Page;
