'use server';
import prisma from "@/app/lib/prisma";
import { alterarSenhaAdmin } from "./alterarSenhaAdmin";
import { alterarSenhaProf } from "./alterarSenhaProf";
import bcrypt from 'bcryptjs'

export const alterarSenhaUsuarioPorEmail = async (email: string, password:string) => {
    try {
        if(email !== undefined){
            password = bcrypt.hashSync(password,10)
            const admin = await prisma.tb_administrador.findUnique({
                where: {
                    tb_administrador_email: email,
                },
                select: {
                    tb_administrador_id: true,
                    tb_administrador_nome: true,
                    tb_administrador_email: true,
                }
            });
                if (admin) {
                    alterarSenhaAdmin(email, password)
                }else{
                    const prof = await prisma.tb_profissionalsaude.findUnique({
                    where: {
                        tb_profissionalSaude_email: email,
                    },
                    select: {
                        tb_profissionalSaude_email: true,
                        tb_profissionalSaude_nome: true,
                        tb_profissionalSaude_id: true,
                    }
                });

                if (prof){
                    alterarSenhaProf(email,password)
                }

            }
            
        }
        
        return undefined;

    } catch (error) {
        return undefined;
    }
};
