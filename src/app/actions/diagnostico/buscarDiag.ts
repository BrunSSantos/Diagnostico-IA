'use server';
import prisma from "@/app/lib/prisma";

export const buscarDiagnostico = async (id: number) => {
    try {
            const diag = await prisma.tb_diagnostico.findUnique({
                where: {
                    tb_diagnostico_id: id,
                },
                select: {
                    tb_diagnostico_img: true,
                    tb_diagnostico_desc: true,
                    tb_diagnostico_accurancy: true,
                    tb_diagnostico_nomePaciente: true,
                    tb_diagnostico_resultado: true,
                }
            });
            if (diag) {
                return diag;
            }

    } catch (error) {
        return undefined;
    }
};
