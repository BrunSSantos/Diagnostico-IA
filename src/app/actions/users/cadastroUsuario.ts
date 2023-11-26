'use server';

import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs'

export const cadastroUser = async (nome: string, email: string, registro: string,
  cargo: number, admin?: number, expedIni?: Date, expedFim?: Date) => {
  if (registro.trim() === '') {
    const user = await prisma.tb_administrador.findUnique({
      where: {
        tb_administrador_email: email
      }
    });
    if (user) {
      return "Já existe um usuário com esse email";
    }
    const password = await criptografarSenha(nome, email, registro, cargo)
    await prisma.tb_administrador.create({
      data: {
        tb_administrador_nome: nome,
        tb_administrador_email: email,
        tb_administrador_senha: password,
        tb_administrador_cargoFK: cargo,
      }
    })
    return "Sucesso ao criar novo usuário administrador!";
  }
  const user = await prisma.tb_profissionalsaude.findUnique({
    where: {
      tb_profissionalSaude_email: email
    }
  });
  if (user) {
    return "Já existe um usuário com esse email";
  }
  const password = await criptografarSenha(nome, email, registro, cargo)
  await prisma.tb_profissionalsaude.create({
    data: {
      tb_profissionalSaude_nome: nome,
      tb_profissionalSaude_registro: registro,
      tb_profissionalSaude_email: email,
      tb_profissionalSaude_senha: password,
      tb_profissionalSaude_expedienteInicio: expedIni,
      tb_profissionalSaude_expedienteFim: expedFim,
      tb_profissionalSaude_admFK: admin,
      tb_profissionalSaude_cargoFK: cargo,

    }
  })

  return "Sucesso ao criar novo usuário!";

}
async function gerarSenhaTempComCargo(nomeCompleto: string, cargo: number, email: string, usuarioExistente: boolean) {
  let nome: string;
  let cargoSenha: string;
  let senhaTemp: string;
  if (usuarioExistente) {
    const administrador = await buscarAdministrador(email);

    if(administrador){
      const [administradorNome, , administradorCargo] = administrador;
      const partesNome = administradorNome.split(' ');
      nome = partesNome.length > 0 ? partesNome[0] : '';
      cargoSenha = administradorCargo !== null ? administradorCargo.toString() : '';
      senhaTemp = nome + cargoSenha;
      return senhaTemp;
    }else {
      console.error('Administrador de saúde não encontrado.');
      return null;
    }
  } else {
    cargoSenha = cargo.toString();
    const partesNome = nomeCompleto.split(' ');
    nome = partesNome.length > 0 ? partesNome[0] : '';
    senhaTemp = nome + cargoSenha;
    return senhaTemp;
  }
  
  

}
async function criptografarSenha(nome: string, email: string, registro: string, cargo: number) {
  if (registro.trim() === '') {
    const password = await gerarSenhaTempComCargo(nome, cargo, email, false);
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

}

async function gerarSenhaTempComRegistro(
  nomeCompleto: string,
  registro: string,
  usuarioExistente: boolean,
  email: string
): Promise<string | null> {
  // Verifica se os argumentos são válidos
  if (!nomeCompleto || !registro) {
    console.error('Nome completo e registro são obrigatórios.');
    return null;
  }

  let nome: string;
  let ultimosQuatroDigitos: string;

  if (usuarioExistente) {
    const profissionalSaude = await buscarProfissionalSaude(email);

    if (profissionalSaude) {
      const [profissionalSaudeNome, profissionalSaudeRegistro] = profissionalSaude;
      const partesNome = profissionalSaudeNome.split(' ');
      nome = partesNome.length > 0 ? partesNome[0] : '';
      ultimosQuatroDigitos = profissionalSaudeRegistro ? profissionalSaudeRegistro.slice(-4) : '';
    } else {
      console.error('Profissional de saúde não encontrado.');
      return null;
    }
  } else {
    const partesNome = nomeCompleto.split(' ');
    nome = partesNome.length > 0 ? partesNome[0] : '';
    ultimosQuatroDigitos = registro.slice(-4);
  }

  const username = nome + ultimosQuatroDigitos;
  return username;
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

