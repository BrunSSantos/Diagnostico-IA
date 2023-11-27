'use client';
import { InputSimples } from "@/components/TextInput";
import '../app/globals.css';
import AverageCommonButton from "./AverageCommonButton";
import React, { useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { getTodayDate } from "@mui/x-date-pickers/internals";
import { getValue } from "@mui/system";
import { DateCalendar } from "@mui/x-date-pickers";
import { SingleImageDropzone } from "./single-image-dropzone";

const FormDiagnostico = () => {
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
    const [idProf, setIdProf] = React.useState<Number | undefined>(undefined);
    
    
    
        
    const handleClick = () => {
        
        console.log('Botão clicado!');
    };

    const handleSubmit = async () => {
             
        console.log("Botão clicado!");
        
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