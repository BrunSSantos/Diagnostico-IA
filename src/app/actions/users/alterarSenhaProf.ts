'use server';
import prisma from "@/app/lib/prisma";

export const alterarSenhaProf = async (email: string, senha: string) => {
    try {
        await prisma.tb_profissionalsaude.update({
            where: { tb_profissionalSaude_email: email },
            data: {
                tb_profissionalSaude_senha: senha
            }
          });
        return "Senha redefinida com sucesso";
    } catch (error) {
        return "Erro ao alterar senha do profissional da sáude";
    }
};
