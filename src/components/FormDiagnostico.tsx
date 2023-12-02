'use client';
import { InputSimples } from "@/components/TextInput";
import '../app/globals.css';
import AverageCommonButton from "./AverageCommonButton";
import React, { useEffect, useState } from "react";
import {buscarIdProf} from '@/app/actions/diagnostico/buscarIdProf'
import { SingleImageDropzone } from "./single-image-dropzone";
import { buscarDiagnostico } from "@/app/actions/diagnostico/buscarDiag";
import { cadastroDiagnostico } from "@/app/actions/diagnostico/cadastroDiagnostico";

const FormDiagnostico = ({ email }: { email: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [img, setImg] = React.useState('')
   
    const [nomePaciente, setNomePaciente] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [acurrancy, setAcurrancy] = React.useState('0');
    const [profissional, setProfissional] = React.useState('');
    
    
    
        
    const handleClick = () => {
        
        console.log('Botão clicado!');
    };

    const handleSubmit = async () => {

        setProfissional(email)

        const IdProf = await buscarIdProf(profissional)

        if (IdProf !== undefined){
            const profId = IdProf.tb_profissionalSaude_id;

            if (img !== null && nomePaciente !== null){
                const mensagem = await cadastroDiagnostico(img, nomePaciente, descricao, '', profId);
            }else{
                console.log("O cadastro do diagnóstico deu erro!")
            }
        }
             
        
        
    }
       

    return (
        <div className="relative flex justify-center items-center">
            <div className=" flex flex-col items-center ">
                <h2 className="text-cor-texto-principal/80 text-3xl text-center tracking-widest">Diagnóstico Médico</h2>
                <br></br>
                <label className="labelColor">Imagem do Raio - X</label>
                <SingleImageDropzone height={100} width={100} value={img} ></SingleImageDropzone>
                <div className=" mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Nome do Paciente*"} value={nomePaciente} onChange={setNomePaciente} />
                </div>
                <div className="mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Descrição*"} value={descricao} onChange={setDescricao} />
                </div>
                <br></br>
                

                <div className="flex justify-center">
                    <AverageCommonButton label="Cadastrar" onClick={handleSubmit} />
                </div>

                
                
                
            </div>
        </div>
    );
}

export default FormDiagnostico;