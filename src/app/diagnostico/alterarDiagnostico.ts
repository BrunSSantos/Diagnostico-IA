'use server';
import prisma from "@/app/lib/prisma";

export const alterarDiagnostico = async (id: number, nomePaciente: string, descricao: string) => {
    try {
        await prisma.tb_diagnostico.update({
            where: { tb_diagnostico_id: id },
            data: {
                tb_diagnostico_nomePaciente: nomePaciente,
                tb_diagnostico_desc: descricao
            }
          });
        return "Diagnóstico alterado com sucesso";
    } catch (error) {
        return "Erro ao alterar diagnóstico";
    }
};
