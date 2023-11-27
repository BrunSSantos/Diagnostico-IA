'use server';
import prisma from "@/app/lib/prisma";

export const listarDiagnostico = async () => {
    try {
      const diagnosticos = await prisma.tb_diagnostico.findMany();
      return diagnosticos; // Retorna um array de strings com os nomes dos cargos
    } catch (error) {
      console.error("Erro ao listar os diagnósticos:", error);
      throw error;
    }
  };