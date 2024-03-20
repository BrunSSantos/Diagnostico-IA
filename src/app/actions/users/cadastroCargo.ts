'use server';
import prisma from "@/app/lib/prisma";

export const cadastroCargo = async (cargoNome: string) => {
    try {
        const cargo = await prisma.tb_cargo.findUnique({
            where: {
                tb_cargo_nome: cargoNome
            }
        });
        if (cargo) {
            return "Já existe um cargo com esse nome";
        }
        await prisma.tb_cargo.create({
            data: {
                tb_cargo_nome: cargoNome,
            },
        });

        return "Cargo cadastrado com sucesso";
    } catch (error) {
        console.error("Erro ao cadastrar cargo:", error);
        return "Erro ao cadastrar cargo";
    }
};
