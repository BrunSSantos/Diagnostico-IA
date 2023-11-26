'use server';
import prisma from "@/app/lib/prisma";

export const buscarCargo = async (cargoId: number) => {
    try {
        const cargoNome = await prisma.tb_cargo.findUnique({
            where: {
                tb_cargo_id: cargoId,
            },
            select: {
                tb_cargo_nome: true,
            }
        });
        if (cargoNome) {
            return cargoNome;
        }
        return null;

    } catch (error) {
        return null;
    }
};
