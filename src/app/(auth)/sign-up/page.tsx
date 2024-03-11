"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SignUpParticulier from "@/components/personaliser/SignUpParticulier";
import SignUpArtisan from "@/components/personaliser/SignUpArtisan";

const Page = () => {
  const [type, setType] = useState("none");

  return (
    <>
      {type === "none" && (
        <>
          <Button onClick={() => setType("artisan")}>Artisan</Button>
          <Button onClick={() => setType("particulier")}>Particulier</Button>
        </>
      )}
      {type === "particulier" && (
        <>
          <div>particulier</div>
          <Button onClick={() => setType("none")}>retour</Button>
          <SignUpParticulier />
        </>
      )}
      {type === "artisan" && (
        <>
          <div>artisan</div>
          <Button onClick={() => setType("none")}>retour</Button>
          <SignUpArtisan />
        </>
      )}
    </>
  );
};

export default Page;
