'use server';

import prisma from "@/app/lib/prisma";






export const cadastroDiagnostico = async (img: string, nomePaciente: string, 
    desc: string, resultado: string, acurrancy: string, profissionalSaudeFK: number, data: Date) =>{
  
        try {
            if (profissionalSaudeFK == null){
                return "Profissional da Saúde não identificado";
            }
    
            if (img.length == 0) {
                return "Não é possível realizar o diagnóstico sem o upload de um Raio-X"
            }
    
            await prisma.tb_diagnostico.create({
                data: {
                    
                    tb_diagnostico_nomePaciente: nomePaciente,
                    tb_diagnostico_img: img,
                    tb_diagnostico_desc: desc,
                    tb_diagnostico_resultado: resultado,
                    tb_diagnostico_accurancy: acurrancy,
                    tb_diagnostico_profissionalSaudeFK: profissionalSaudeFK,
                    tb_diagnostico_dataHora: data
                    
                }
            });
    
            return "Diagnóstico Cadastrado com Sucesso!!!";
        } catch (error) {
            console.error("Erro ao cadastrar o diagnóstico", error);
            return "Erro ao cadastrar o diagnóstico";
        }

}