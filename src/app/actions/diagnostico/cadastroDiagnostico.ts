'use server';

import prisma from "@/app/lib/prisma";



const formatData = () =>{
   const dataAgora = new Date().toLocaleDateString();

   return dataAgora;
}


export const cadastroDiagnostico = async (img: string, nomePaciente: string, 
    desc: string, acurrancy: string, profissionalSaudeFK: number) =>{
  
        try {
            if (profissionalSaudeFK == null){
                return "Profissional da Saúde não identificado";
            }
    
            if (img.length == 0) {
                return "Não é possível realizar o diagnóstico sem o upload de um Raio-X"
            }
    
            await prisma.tb_diagnostico.create({
                data: {
                    
                    tb_diagnostico_img: img,
                    tb_diagnostico_desc: desc,
                    tb_diagnostico_accurancy: acurrancy,
                    tb_diagnostico_profissionalSaudeFK: profissionalSaudeFK,
                    tb_diagnostico_dataHora: formatData(),
                    tb_diagnostico_nomePaciente: nomePaciente
                    
                    
            
                    
                    
                    
    
                    
    
    
                }
            });
    
            return "Diagnóstico Cadastrado com Sucesso!!!";
        } catch (error) {
            console.error("Erro ao cadastrar o diagnóstico", error);
            return "Erro ao cadastrar o diagnóstico";
        }

}