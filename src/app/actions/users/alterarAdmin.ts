'use server';
import prisma from "@/app/lib/prisma";
import { buscarAdminPorEmail } from "./buscarAdminPorEmail";
import { buscarIdAdmin } from "./buscarIdAdmin";
import { buscarProfissionalSaude } from "./buscarProfSaude";
import { buscarIdProf } from "../diagnostico/buscarIdProf";

export const alterarAdmin = async (id: number, nome: string, email: string, cargoId: number) => {
    try {


        await prisma.tb_administrador.update({
            where: { tb_administrador_id: id },
            data: {
                tb_administrador_nome: nome,
                tb_administrador_email: email,
                tb_administrador_cargoFK: cargoId,
            }
          });
        return "Usuário alterado com sucesso";
    } catch (error) {
        console.error("Erro ao cadastrar cargo:", error);
        return "Erro ao alterar usuário";
    }
};
