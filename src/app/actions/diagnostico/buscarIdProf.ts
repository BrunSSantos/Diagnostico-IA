'use server';
import prisma from "@/app/lib/prisma";

export const buscarIdProf = async (email: string, id?: number) => {
    try {
        if(id !== undefined){
            const prof = await prisma.tb_profissionalsaude.findUnique({
                where: {
                    tb_profissionalSaude_id: id,
                },
                select: {
                    tb_profissionalSaude_id: true,
                    tb_profissionalSaude_nome: true,
                    tb_profissionalSaude_email: true,
                }
            });
            if (prof) {
                return prof;
            }
            return undefined;
        }
        const prof = await prisma.tb_profissionalsaude.findFirst({
            where: {
                tb_profissionalSaude_email: email
            },
            select: {
                tb_profissionalSaude_id: true,
            }
        });
        if (prof) {
            return prof;
        }
        return undefined;
        
       
    } catch (error) {                                                                                                                                                                                                                               
        return undefined;
    }
};
