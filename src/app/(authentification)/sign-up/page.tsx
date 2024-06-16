"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SignUpParticulier from "@/components/personaliser/SignUpParticulier";
import SignUpArtisan from "@/components/personaliser/SignUpArtisan";

const Page = () => {
  const [type, setType] = useState("none");

  return (
    <div className="h-full flex flex-col justify-evenly items-center ">
      {type === "none" && (
          <>
            <h1 className=" custom-title">Vous êtes ?</h1>
            <div className="octagon" onClick={() => setType("particulier")}>
              <div>Particulier</div>
            </div>
            <div className="octagon" onClick={() => setType("artisan")}>
              <div>Artisan</div>
            </div>
          </>
      )}
      {type === "particulier" && (
          <>
            <h1 className="custom-title">particulier</h1>
            <SignUpParticulier resetType={() => setType("none")}/>
          </>
      )}
      {type === "artisan" && (
          <>
            <h1 className="custom-title">artisan</h1>
            <SignUpArtisan resetType={() => setType("none")}/>
          </>
      )}
    </div>
  );
};

export default Page;
