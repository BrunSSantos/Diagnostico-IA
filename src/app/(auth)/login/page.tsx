'use client';
import { buscarAdminPorEmail } from "@/app/actions/users/buscarAdminPorEmail";
import { buscarProfissionalSaudePorEmail } from "@/app/actions/users/buscarProfSaudePorEmail";
import { verificarSenhaTemp } from "@/app/actions/users/verificaSenhaTemp";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { buscarIdProf } from "@/app/diagnostico/buscarIdProf";
import { AlertLogin } from "@/components/AlertLogin";
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MuiAlert, { Alert } from '@mui/material'

export default function Login() {

      
	const router = useRouter();
  const { status } = useSession();
  const [isLogged, setLogged] = useState<Boolean>(true);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async () => {
    try {
      const signInResponse = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (!signInResponse || signInResponse.ok !== true) {
    
        console.log("Credenciais Inválidas");
        
        setLogged(false)
        
      
        
        
      } else {

        

        router.refresh();
      }
    } catch (err) {
      console.error("Erro ao efetuar login:", err);
    }
  };

 /* async function gerarSenhaTempComCargo(nomeCompleto: string, cargo: number): Promise<string | null> {
    let nome: string;
    let cargoSenha: string;
    let senhaTemp: string;
    
    const partesNome = nomeCompleto.split(' ');
    nome = partesNome.length > 0 ? partesNome[0] : '';
    cargoSenha = cargo !== null ? cargo.toString() : '';
    senhaTemp = nome + cargoSenha;
    return senhaTemp;
  }

  async function gerarSenhaTempComRegistro(
    nomeCompleto: string,
    registro: string,
  ): Promise<string | null>{
    
    let nome: string;
    let ultimosQuatroDigitos: string;
  
    const partesNome = nomeCompleto.split(' ');
    nome = partesNome.length > 0 ? partesNome[0] : '';
    ultimosQuatroDigitos = registro ? registro.slice(-4) : '';

    const username = nome + ultimosQuatroDigitos;
    
    return username;
  }
    
    
    
  
  }

  

  const isAdmin = async(email:string) =>{
      const admin = await buscarAdminPorEmail(email);

      if (admin){
          return admin;
      }

      return null;
  }

  const isProfSaude = async(email:string) =>{
    const prof = await buscarProfissionalSaudePorEmail(email);

    if (prof){
        return prof;
    }

    return null;
}*/

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const buscaUsuario = async (email: string) =>{
      const prof = await buscarIdProf(email)


      const usu = await verificarSenhaTemp(email,password)

        if(usu){
          router.refresh();
          router.push("./redefinirSenha");
        
        }else if(!usu){

          if(prof){
            router.refresh();
            router.push("./medico/home/");
          }else{
            router.refresh();
            router.push("./admin/home/");
            
          }

        }else{
          setLogged(false)

        }

      
  }

  useEffect(() => {
    if (status === 'authenticated') {
        buscaUsuario(email);
      
    }

    

  }, [status]);



	return (

		<div className="relative bg-gray-700/20 h-120 w-120 border-2 border-cor-texto-principal/10 rounded-lg shadow-xl shadow-cor-texto-principal/10">
			<div className="absolute h-120 w-120 pl-14 pr-10 flex flex-col">
			<h2 className="text-cor-texto-principal/80 pt-5 font-medium text-4xl text-center tracking-widest">Login</h2>
      
      {!isLogged ? (
        
        <>
          <Alert severity="error" >Credencias Inválidas</Alert>
          
        </>
        
      ):(
        <></>
      )}
          
      
			<div className="inputBox relative w-96 mt-9">
				<input value={email} onChange={handleEmailChange} type="text" className="relative w-96 pt-5 px-2.5 pb-2.5 bg-transparent border-none outline-none text-base tracking-wider z-20" required></input>
				<span className="absolute left-0 pt-5 px-0 pb-2.5 text-gray-400 text-base pointer-events-none tracking-wider transition ">Email</span>
				<i></i>
			</div>
			<div className="inputBox relative w-96 mt-9">
				<input value={password}  onChange={handlePasswordChange} type="password" className="relative w-96 pt-5 px-2.5 pb-2.5 bg-transparent border-none outline-none text-base tracking-wider z-20" required></input>
				<span className="absolute left-0 pt-5 px-0 pb-2.5 text-gray-400 text-base pointer-events-none tracking-wider transition">Senha</span>
				<i></i>
			</div>
			<div className="flex justify-between" >
				<div className="pt-2.5 pr-0">
				<label className="text-gray-400 text-sm pl-1 hover:text-cor-texto-principal/80 cursor-pointer"><input className="cursor-pointer accent-cor-texto-principal" type="checkbox"></input>Lembre-se de mim</label>
				</div>
				<a href="#" className="pt-2.5 pr-0 text-gray-400 hover:text-cor-texto-principal/80 text-sm">Esqueci a senha</a>
			</div>
			<div className="flex justify-center">
			<input onClick={handleSubmit} className="border-none outline-none bg-cor-texto-principal/80  mt-8 w-32 h-12 rounded font-semibold cursor-pointer hover:bg-light-blue-700 shadow-xl hover:shadow-cyan-500/25 hover:text-gray-200/80 active:opacity-80" type="submit" value="Entrar"></input>
			</div>
			</div>
		</div>

	)
}