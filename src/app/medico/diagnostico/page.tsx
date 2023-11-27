'use client';
import FormDiagnostico from "@/components/FormDiagnostico";
import FormCadastroUsuario from "@/components/FormDiagnostico";
import Navbar from "@/components/NavBar";
import Head from "next/head";
import Image from "next/image";


export default function Diagnostico(){
    

    return(
    <>
    <div className="w-full flex flex-col min-h-screen">

  {/* Navbar no topo */}
 
  <Navbar logoSrc="/img/cardiogram.png"/>
  

  {/* Conteúdo centralizado no meio */}
  <div className="flex-grow flex items-center justify-center">
  < FormDiagnostico/>
  </div>

</div>
    </>
    )
}