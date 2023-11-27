import prisma from "./prisma";
import bcrypt from 'bcryptjs';

export async function buscarUsuario(email: string, providedPassword: string) {
    const profissionalSaude = await buscarProfissionalSaude(email);
  if (profissionalSaude !== null) {
    if (await validarSenha(providedPassword, profissionalSaude[2])) {
      return profissionalSaude;
    }
  }

  const administrador = await buscarAdministrador(email);
  if (administrador !== null) {
    if (await validarSenha(providedPassword, administrador[2])) {
      return administrador;
    }
  }

  return null;
}

async function buscarProfissionalSaude(email: string) {
    const user = await prisma.tb_profissionalsaude.findUnique({
        where: {
            tb_profissionalSaude_email: email
        },
        select: {
            tb_profissionalSaude_id: true,
            tb_profissionalSaude_email: true,
            tb_profissionalSaude_senha: true
        }
    });
    if(!user){
        return null;
    }
    return converterDadosProfSaude(user)
}

async function buscarAdministrador(email: string) {
    const user = await prisma.tb_administrador.findUnique({
        where: {
            tb_administrador_email: email
        },
        select: {
            tb_administrador_id: true,
            tb_administrador_email: true,
            tb_administrador_senha: true
        }
    });
    if(!user){
        return null;
    }
    return converterDadosAdmin(user);
}

function converterDadosProfSaude(user: {
    tb_profissionalSaude_id?: number | null;
    tb_profissionalSaude_email?: string | null;
    tb_profissionalSaude_senha?: string | null;
}): [string, string | null, string | null] {
    const id: string = user?.tb_profissionalSaude_id?.toString() ?? '';
    const email: string | null = user?.tb_profissionalSaude_email ?? null;
    const senha: string | null = user?.tb_profissionalSaude_senha ?? null;

    return [id, email, senha];
}

function converterDadosAdmin(user: {
    tb_administrador_id?: number | null;
    tb_administrador_email?: string | null;
    tb_administrador_senha?: string | null;
  }): [string, string | null, string | null] {
    const id: string = user?.tb_administrador_id?.toString() ?? '';
    const email: string | null = user?.tb_administrador_email ?? null;
    const senha: string | null = user?.tb_administrador_senha ?? null;
  
    return [id, email, senha];
  }

  async function validarSenha(
    providedPassword: string,
    storedPassword: string | null
  ): Promise<boolean> {
    if (storedPassword === null) {
      return false;
    }

    const isValidPassword = await bcrypt.compare(providedPassword, storedPassword);
    return isValidPassword;
  }