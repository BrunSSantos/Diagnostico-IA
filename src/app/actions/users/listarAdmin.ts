'use server';
import prisma from "@/app/lib/prisma";

export const listarAdmin = async () => {
    try {
      const admins = await prisma.tb_administrador.findMany();
      return admins.map(admin => admin); 
    } catch (error) {
      console.error("Erro ao listar admins:", error);
      throw error;
    }
  };