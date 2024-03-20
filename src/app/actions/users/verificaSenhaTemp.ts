'use server';

import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs'
import { buscarProfissionalSaudePorEmail } from "./buscarProfSaudePorEmail";
import { buscarAdminPorEmail } from "./buscarAdminPorEmail";


export const verificarSenhaTemp = async (email:string, senha: string)=>{

   const admin = await buscarAdminPorEmail(email);

   let isAdmin;
   let isProf
   let senhaTemp;

   if (admin){
        const [nome, email,cargo,adminSenha] = admin;

        if(email !== null){
           senhaTemp = await gerarSenhaTempComCargo(email)
        }
        
        if(senhaTemp !== undefined && senhaTemp !== null){
          isAdmin = await bcrypt.compare(senhaTemp, adminSenha)
        }

        
      
        
    }

  let senhaTempProf;

  const profissionalSaude = await buscarProfissionalSaudePorEmail(email)

  if (profissionalSaude){
    const [nomeProf, registro, emailProf, senhaProf] = profissionalSaude;
    
    if (emailProf !== null){
      senhaTempProf = await gerarSenhaTempComRegistro(email)
    }

    if(senhaTempProf !== undefined && senhaTempProf !== null){
      isProf = await bcrypt.compare(senhaTempProf, senhaProf)
    }



  }


  if (!isAdmin && !isProf){
      return false;
  }

  return true;
  

  

}
  

    



  



async function gerarSenhaTempComCargo(email: string) {
  let nome: string;
  let cargoSenha: string;
  let senhaTemp: string;
  
    const administrador = await buscarAdministrador(email);

    if(administrador){
      const [administradorNome, , administradorCargo] = administrador;
      const partesNome = administradorNome.split(' ');
      nome = partesNome.length > 0 ? partesNome[0] : '';
      cargoSenha = administradorCargo !== null ? administradorCargo.toString() : '';
      senhaTemp = nome + cargoSenha;
      return senhaTemp;
    }

    return null;
    
  
  

}
/*async function criptografarSenha(email:string) {
  if (registro.trim() === '') {
    const password = await gerarSenhaTempComCargo(email);
    if(password !== null) {
      const passwordHash = bcrypt.hashSync(password, 10);
      return passwordHash;
    } else{
      console.error('Erro ao criptografar senha.');
      return null;
    }
  }
  const password = await gerarSenhaTempComRegistro(nome, registro, false, email);
  if (password !== null) {
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;

  } else {
    console.error('Erro ao criptografar senha.');
    return null;
  }

}*/

async function gerarSenhaTempComRegistro(email: string){
  // Verifica se os argumentos são válidos
  let nome: string;
  let ultimosQuatroDigitos: string;

  
  const profissionalSaude = await buscarProfissionalSaude(email);

  if (profissionalSaude) {
      const [profissionalSaudeNome, profissionalSaudeRegistro] = profissionalSaude;
      const partesNome = profissionalSaudeNome.split(' ');
      nome = partesNome.length > 0 ? partesNome[0] : '';
      ultimosQuatroDigitos = profissionalSaudeRegistro ? profissionalSaudeRegistro.slice(-4) : '';
      const username = nome + ultimosQuatroDigitos;
      return username;
  } 

  return null;
  
  
}

async function buscarProfissionalSaude(email: string) {
  const user = await prisma.tb_profissionalsaude.findUnique({
    where: {
      tb_profissionalSaude_email: email,
    },
    select: {
      tb_profissionalSaude_nome: true,
      tb_profissionalSaude_registro: true,
      tb_profissionalSaude_email: true,
      tb_profissionalSaude_senha: true,
    },
  });

  return user ? converterDadosProfSaude(user) : null;
}

function converterDadosProfSaude(user: {
  tb_profissionalSaude_nome?: string | null;
  tb_profissionalSaude_registro?: string | null;
  tb_profissionalSaude_email?: string | null;
  tb_profissionalSaude_senha?: string | null;
}): [string, string | null, string | null, string | null] {
  const nome: string = user.tb_profissionalSaude_nome || '';
  const registro: string | null = user.tb_profissionalSaude_registro || null;
  const email: string | null = user.tb_profissionalSaude_email || null;
  const senha: string | null = user.tb_profissionalSaude_senha || null;

  return [nome, registro, email, senha];
}

async function buscarAdministrador(email: string) {
  const user = await prisma.tb_administrador.findUnique({
    where: {
      tb_administrador_email: email
    },
    select: {
      tb_administrador_nome: true,
      tb_administrador_email: true,
      tb_administrador_cargoFK: true
    }
  });
  if (!user) {
    return null;
  }
  return converterDadosAdmin(user);
}

function converterDadosAdmin(user: {
  tb_administrador_nome?: string | null;
  tb_administrador_email?: string | null;
  tb_administrador_cargoFK?: number | null;
}): [string, string | null, number | null] {
  const nome: string | null = user?.tb_administrador_nome || '';
  const email: string | null = user?.tb_administrador_email ?? null;
  const cargoFK: number | null = user?.tb_administrador_cargoFK ? Number(user.tb_administrador_cargoFK) : null;

  return [nome, email, cargoFK];
}

