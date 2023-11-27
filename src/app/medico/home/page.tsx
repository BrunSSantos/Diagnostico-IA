'use client';
import AverageCommonButton from "@/components/AverageCommonButton";
import FormCadastroUsuario from "@/components/FormCadastroUsuario";
import Navbar from "@/components/NavBar";
import Head from "next/head";
import Image from "next/image";

export default function Home(){
    const handleClick = () => {
        // Lógica a ser executada quando o botão for clicado
        console.log('Botão clicado!');
      };
 return(

    <>
    <div className="w-full flex flex-col min-h-screen">

  {/* Navbar no topo */}
 
  <Navbar logoSrc="/img/cardiogram.png"/>
  

  {/* Conteúdo centralizado no meio */}
  <div className="flex-grow flex flex-col items-center justify-center">
  <h2 className="text-cor-texto-principal/80 text-3xl text-center tracking-widest -mt-16 mb-10">Diagnósticos Médicos</h2>
    <div className="flex items-center justify-center h-60 w-120 bg-gray-700/20 border-2 border-cor-texto-principal/10 rounded-lg shadow-xl shadow-cor-texto-principal/10 ">
  <AverageCommonButton label="Diagnosticar" onClick={handleClick} />
  <div className="mx-4"/>
  <AverageCommonButton label="Listar" onClick={handleClick} />
  </div>
  </div> 
</div>
  </>
 )
}