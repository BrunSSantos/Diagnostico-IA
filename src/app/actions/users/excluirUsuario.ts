'use server';
import prisma from "@/app/lib/prisma";
import { buscarIdAdmin } from "./buscarIdAdmin";
import { buscarAdmin } from "./buscarAdmin";
import { buscarProfissionalSaude } from "./buscarProfSaude";

export const excluirUsuario = async (id: number) => {
    try {

        const isAdmin = await buscarAdmin(id);

        if(isAdmin){
            await prisma.tb_administrador.delete({
                where: { tb_administrador_id: id },
               
              });
        }else{

            const isProf = await buscarProfissionalSaude(id);

            if (isProf){
                await prisma.tb_profissionalsaude.delete({
                    where: { tb_profissionalSaude_id: id },
                   
                  });
            }

        }

    
        return "Usuário excluído com sucesso";
    } catch (error) {
       
        return "Erro ao excluir usuário";
    }
};
