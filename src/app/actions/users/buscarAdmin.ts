'use server';
import prisma from "@/app/lib/prisma";

export const buscarAdmin = async (id: number) => {
    try {
            const admin = await prisma.tb_administrador.findUnique({
                where: {
                    tb_administrador_id: id,
                },
                select: {
                    tb_administrador_id: true,
                    tb_administrador_nome: true,
                    tb_administrador_email: true,
                    tb_administrador_cargoFK: true,
                }
            });
            if (admin) {
                return admin;
            }

    } catch (error) {
        return undefined;
    }
};
