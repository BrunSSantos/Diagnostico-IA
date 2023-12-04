'use client';
import { InputSimples } from "@/components/TextInput";
import '../app/globals.css';
import AverageCommonButton from "./AverageCommonButton";
import React, { useEffect, useState } from "react";
import { buscarIdProf } from '@/app/actions/diagnostico/buscarIdProf'
import { SingleImageDropzone } from "./single-image-dropzone";
import { buscarDiagnostico } from "@/app/actions/diagnostico/buscarDiag";
import { cadastroDiagnostico } from "@/app/actions/diagnostico/cadastroDiagnostico";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../firebase';
import { nanoid } from 'nanoid';

const FormDiagnostico = ({ email }: { email: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<{ classe: string; probabilidade: number } | null>(null);
    const [nomePaciente, setNomePaciente] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [acurrancy, setAcurrancy] = React.useState('0');
    const [profissional, setProfissional] = React.useState('');

    const handlePredict = async (imageFile: File) => {
        try {
            const formData = new FormData();
            formData.append('imagem', imageFile);

            const response = await fetch('http://159.65.164.8:5000/predict', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Sucesso');
                const data = await response.json();
                return data;

            } else {
                console.error('Erro ao chamar a API:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erro durante a solicitação:', error);
        }
    };


    const handleClick = () => {

        console.log('Botão clicado!');
    };

    const handleUpload = async (nomeP: string, desc: string, predicao: string, accurancy: string, profId: number) => {
        if (file) {
            const storage = getStorage(app);
            const imageName = nanoid();
            const fileExtension = file.name.split('.').pop(); // Obtendo a extensão do arquivo
            const storageRef = ref(storage, `imagens/${imageName}.${fileExtension}`);
            await uploadBytes(storageRef, file);
            console.log('Imagem enviada com sucesso!');
            const img = imageName + '.' + fileExtension;
            const mensagem = await cadastroDiagnostico(img, nomeP, desc, predicao, accurancy, profId);
            console.log(mensagem);
        }
    };

    const handleSubmit = async () => {
        console.log('botao confirmar clicado');
        setProfissional(email)

        const IdProf = await buscarIdProf(profissional)
        console.log(IdProf);
        console.log(email);
        if (IdProf !== undefined) {
            const profId = IdProf.tb_profissionalSaude_id;
            console.log('TESTE 1');

            if (file !== undefined && nomePaciente !== null) {
                //const mensagem = await cadastroDiagnostico(file, nomePaciente, descricao, '', profId);
                //console.log(mensagem);
                const resultado = await handlePredict(file);
                if (resultado) {
                    var classe = resultado.classe;
                    var probabilidade = resultado.probabilidade.toFixed(2) * 100;

                    var predicao = classe.toString();
                    var acurrancy = probabilidade.toString();

                    console.log('Classe:', predicao);
                    console.log('Probabilidade:', acurrancy);
                    handleUpload(nomePaciente, descricao, predicao, acurrancy, profId);
                    console.log(resultado);
                }



            } else {
                console.log("O cadastro do diagnóstico deu erro!")
            }
        }



    }


    return (
        <div className="relative flex justify-center items-center">
            <div className=" flex flex-col items-center ">
                <h2 className="text-cor-texto-principal/80 text-3xl text-center tracking-widest">Realizar Diagnostico</h2>
                <br></br>
                <label className="text-white">Imagem do Raio - X</label>
                <SingleImageDropzone height={400} width={400} value={file} onChange={(file) => {
                    setFile(file);
                }} ></SingleImageDropzone>
                <div className=" mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Nome do Paciente*"} value={nomePaciente} onChange={setNomePaciente} />
                </div>
                <div className="mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Descrição*"} value={descricao} onChange={setDescricao} />
                </div>
                <br></br>


                <div className="flex justify-center">
                    <AverageCommonButton label="Confirmar" onClick={handleSubmit} />
                </div>




            </div>
        </div>
    );
}

export default FormDiagnostico;