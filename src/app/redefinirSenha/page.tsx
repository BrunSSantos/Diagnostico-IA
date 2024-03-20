

import FormRedefinirSenha from "@/components/FormRedefinirSenha";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/SignOut";


export default async function novaSenha() {

  
  const session = await getServerSession(authOptions);

  return (

    <>
    
    {session && session.user?.email ? (
      <>
            <div className="w-full flex flex-col min-h-screen">

              {/* Navbar no topo */}
          
              {/* Conteúdo centralizado no meio */}
                  <div className="flex-grow flex items-center justify-center">
                    <FormRedefinirSenha/>
                  </div>
          
            </div>
      </>  
    ): (
      <>
        <SignOut />
      </>
    )}
    

    </> 
    

  )
}