"use client";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
// import { useQuery, useIsFetching } from "@tanstack/eslint-plugin-query";
import Image from "next/image";
import PageAccueil from "./accueil/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();
  const router = useRouter();

  const signOutAndRedirect = () => {
    signOut();
    if (isSuccess) {
      router.push("/");

      console.log("sign out success");
    }
  };

  return (
    <main>
      {/* <h1> hello my friende ! </h1> */}
      <PageAccueil />
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={signOutAndRedirect}
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/assets/icons/logout.svg"
          alt="log out icon"
          width={50}
          height={50}
          priority
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
      <Button></Button>
    </main>
  );
}
