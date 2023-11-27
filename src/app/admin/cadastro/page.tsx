'use client';
import FormCadastroUsuario from "@/components/FormCadastroUsuario";
import Navbar from "@/components/NavBar";
import Head from "next/head";
import Image from "next/image";


export default function Cadastro(){
    

    return(
    <>
    <div className="w-full flex flex-col min-h-screen">

  {/* Navbar no topo */}
 
  <Navbar logoSrc="/img/cardiogram.png"/>
  

  {/* Conteúdo centralizado no meio */}
  <div className="flex-grow flex items-center justify-center">
  <FormCadastroUsuario />
  </div>

</div>
    </>
    )
}