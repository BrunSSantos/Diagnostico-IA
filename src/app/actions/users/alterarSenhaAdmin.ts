'use server';
import prisma from "@/app/lib/prisma";

export const alterarSenhaAdmin = async (email:string, senha: string) => {
    try {
        await prisma.tb_administrador.update({
            where: { tb_administrador_email: email },
            data: {
                tb_administrador_senha: senha
            }
          });
        return "Senha redefinida com sucesso";
    } catch (error) {
        return "Erro ao alterar senha do usuário";
    }
};
