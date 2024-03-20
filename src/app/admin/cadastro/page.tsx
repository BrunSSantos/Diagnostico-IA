
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormCadastroUsuario from "@/components/FormCadastroUsuario";
import Navbar from "@/components/NavBar";
import NavbarAdmin from "@/components/NavBarAdmin";
import SignOut from "@/components/SignOut";
import { getServerSession } from "next-auth";
import Head from "next/head";
import Image from "next/image";
import React from "react";


export default async function Cadastro() {
  const session = await getServerSession(authOptions);

  return (
    <>

      {session && session.user?.email ? (
        <>
          <div className="w-full flex flex-col min-h-screen">

            {/* Navbar no topo */}

            <NavbarAdmin logoSrc="/img/cardiogram.png" />


            {/* Conteúdo centralizado no meio */}
            <div className="flex-grow flex items-center justify-center">
              <FormCadastroUsuario emailAdmin={session.user?.email} />
            </div>

          </div>
        </>
      ) : (
        <>
          <SignOut />
        </>
      )}

    </>
  )
}