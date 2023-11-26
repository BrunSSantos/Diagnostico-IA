'use server';
import prisma from "@/app/lib/prisma";

export const buscarProfissionalSaude = async (id: number) => {
    try {
        const medico = await prisma.tb_profissionalsaude.findUnique({
            where: {
                tb_profissionalSaude_id: id,
            },
            select: {
                tb_profissionalSaude_id: true,
                tb_profissionalSaude_nome: true,
                tb_profissionalSaude_registro: true,
                tb_profissionalSaude_email: true,
                tb_profissionalSaude_cargoFK: true,
                
            }
        });
        if (medico) {
            return medico;
        }
        return undefined;

    } catch (error) {
        return undefined;
    }
};
