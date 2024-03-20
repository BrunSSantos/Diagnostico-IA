'use server';
import prisma from "@/app/lib/prisma";

export const buscarIdAdmin = async (email: string, id?: number) => {
    try {
        if(id !== undefined){
            const admin = await prisma.tb_administrador.findUnique({
                where: {
                    tb_administrador_id: id,
                },
                select: {
                    tb_administrador_id: true,
                    tb_administrador_nome: true,
                    tb_administrador_email: true,
                }
            });
            if (admin) {
                return admin;
            }
            return undefined;
        }
        const admin = await prisma.tb_administrador.findUnique({
            where: {
                tb_administrador_email: email
            },
            select: {
                tb_administrador_id: true,
            }
        });
        if (admin) {
            return admin;
        }
        return undefined;

    } catch (error) {
        return undefined;
    }
};
