'use server';
import prisma from "@/app/lib/prisma";

export const alterarProfSaude = async (id: number, nome: string, email: string, registro: string, cargoId: number) => {
    try {
        await prisma.tb_profissionalsaude.update({
            where: { tb_profissionalSaude_id: id },
            data: {
                tb_profissionalSaude_nome: nome,
                tb_profissionalSaude_email: email,
                tb_profissionalSaude_registro: registro,
                tb_profissionalSaude_cargoFK: cargoId,
            }
          });
        return "Usuário alterado com sucesso";
    } catch (error) {
        console.error("Erro ao cadastrar cargo:", error);
        return "Erro ao alterar usuário";
    }
};
