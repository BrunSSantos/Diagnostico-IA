import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormDiagnostico from "@/components/FormDiagnostico";
import FormCadastroUsuario from "@/components/FormDiagnostico";
import Navbar from "@/components/NavBar";
import SignOut from "@/components/SignOut";
import { getServerSession } from "next-auth";
import Head from "next/head";
import Image from "next/image";


export default async function Diagnostico(){

  const session = await getServerSession(authOptions);

    

    return(
      <>
      {session && session.user?.email ? (
          <>
            
                <div className="w-full flex flex-col min-h-screen">

                          {/* Navbar no topo */}
                        
                          <Navbar logoSrc="/img/cardiogram.png"/>
                          

                          {/* Conteúdo centralizado no meio */}
                          <div className="flex-grow flex items-center justify-center">
                                < FormDiagnostico email={session.user?.email}  />
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