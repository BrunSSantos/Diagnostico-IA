import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AverageCommonButton from "@/components/AverageCommonButton";
import FormCadastroUsuario from "@/components/FormCadastroUsuario";
import Navbar from "@/components/NavBar";
import NavbarAdmin from "@/components/NavBarAdmin";
import SignOut from "@/components/SignOut";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";


  

export default async function Home(){
  
    const session = await getServerSession(authOptions);
  

   

    const redirecionarConsulta = () => {

      
      
    };

    const redirecionarCadastro = () => {
         redirect('/admin/cadastro') 
    };

    
    


    
    const handleClick = () => {
        // Lógica a ser executada quando o botão for clicado
        console.log('Botão clicado!');
    };

    
      return(

        
        <>
         
           {session && session.user?.email ? (
               <div className="w-full flex flex-col min-h-screen">

               {/* Navbar no topo */}
             
               <NavbarAdmin logoSrc="/img/cardiogram.png"/>
               

               {/* Conteúdo centralizado no meio */}
               <div className="flex-grow flex flex-col items-center justify-center">
               <h2 className="text-cor-texto-principal/80 text-3xl text-center tracking-widest -mt-16 mb-10">Cadastro de Usuários</h2>
                 <div className="flex items-center justify-center h-60 w-120 bg-gray-700/20 border-2 border-cor-texto-principal/10 rounded-lg shadow-xl shadow-cor-texto-principal/10 ">
                 <a href="/admin/cadastro" className="border-none outline-none bg-cor-texto-principal/90 mt-8 text-center pt-2 w-28 h-10 rounded font-semibold 
                        cursor-pointer hover:bg-light-blue-700  hover:text-gray-200/80 active:opacity-80">Cadastrar</a>

               <div className="mx-4"/>

               {/*<AverageCommonButton label="Cadastrar" onClick={handleClick} />*/}
               
               <a href="/admin/listar" className="border-none outline-none bg-cor-texto-principal/90 mt-8 text-center pt-2 w-28 h-10 rounded font-semibold 
                        cursor-pointer hover:bg-light-blue-700  hover:text-gray-200/80 active:opacity-80">Listar</a>
               
               </div>
               
               </div> 
             </div>

           ): (
            <>
            <SignOut />
            </>
          )}
                
        </>
 )
}