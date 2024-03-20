'use server';
import prisma from "@/app/lib/prisma";

export const buscarProfissionalSaudePorEmail = async (email: string) => {
    try {
        const medico = await prisma.tb_profissionalsaude.findUnique({
            where: {
                tb_profissionalSaude_email: email,
            },
            select: {
                
                tb_profissionalSaude_nome: true,
                tb_profissionalSaude_registro: true,
                tb_profissionalSaude_email: true,
                tb_profissionalSaude_senha: true,
                
            }
        });
        if (medico) {
            return converterDadosProfSaude(medico);
        }
        return undefined;

    } catch (error) {
        return undefined;
    }
};

function converterDadosProfSaude(user: {
    tb_profissionalSaude_nome?: string | null;
    tb_profissionalSaude_registro?: string | null;
    tb_profissionalSaude_email?: string | null;
    tb_profissionalSaude_senha?: string | null;
  }): [string, string | null, string | null, string] {
    const nome: string = user.tb_profissionalSaude_nome || '';
    const registro: string | null = user.tb_profissionalSaude_registro || null;
    const email: string | null = user.tb_profissionalSaude_email || null;
    const senha: string | null = user?.tb_profissionalSaude_senha || '';
  
    return [nome, registro, email, senha];
  }
