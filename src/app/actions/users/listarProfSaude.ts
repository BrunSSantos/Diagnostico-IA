'use server';
import prisma from "@/app/lib/prisma";

export const listarProfSaude = async () => {
    try {
      const medicos = await prisma.tb_profissionalsaude.findMany();
      return medicos.map(medico => medico); 
    } catch (error) {
      console.error("Erro ao listar medicos:", error);
      throw error;
    }
  };