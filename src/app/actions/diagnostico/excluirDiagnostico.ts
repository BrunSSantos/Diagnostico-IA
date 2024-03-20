'use server';
import prisma from "@/app/lib/prisma";

export const excluirDiagnostico = async (id: number) => {
    try {
        await prisma.tb_diagnostico.delete({
            where: { tb_diagnostico_id: id },
           
          });
        return "Diagnóstico excluído com sucesso";
    } catch (error) {
        return "Erro ao excluir diagnóstico";
    }
};
