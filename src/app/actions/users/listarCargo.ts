'use server';
import prisma from "@/app/lib/prisma";

export const listarCargo = async () => {
    try {
      const cargos = await prisma.tb_cargo.findMany();
      return cargos.map(cargo => cargo.tb_cargo_nome || ''); // Retorna um array de strings com os nomes dos cargos
    } catch (error) {
      console.error("Erro ao listar cargos:", error);
      throw error;
    }
  };