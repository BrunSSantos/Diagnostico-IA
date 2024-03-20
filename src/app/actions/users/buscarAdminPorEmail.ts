'use server';
import prisma from "@/app/lib/prisma";

export const buscarAdminPorEmail = async (email:string) => {
    try {
            const admin = await prisma.tb_administrador.findUnique({
                where: {
                    tb_administrador_email: email,
                },
                select: {
                    tb_administrador_id: true,
                    tb_administrador_nome: true,
                    tb_administrador_email: true,
                    tb_administrador_cargoFK: true,
                    tb_administrador_senha: true
                }
            });
            if (admin) {
                return converterDadosAdmin(admin);
            }

    } catch (error) {
        return undefined;
    }
};

function converterDadosAdmin(user: {
    tb_administrador_nome?: string | null;
    tb_administrador_email?: string | null;
    tb_administrador_cargoFK?: number | null;
    tb_administrador_senha: string | null
  }): [string, string | null, number | null, string] {
    const nome: string | null = user?.tb_administrador_nome || '';
    const email: string | null = user?.tb_administrador_email ?? null;
    const cargoFK: number | null = user?.tb_administrador_cargoFK ? Number(user.tb_administrador_cargoFK) : null;
    const senha: string | null = user?.tb_administrador_senha || '';
    return [nome, email, cargoFK,senha];
  }
