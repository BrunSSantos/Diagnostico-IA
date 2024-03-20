'use client';
import { CheckboxLabel } from "@/components/CheckBox";
import SelectDefault from "@/components/Select";
import { InputSimples } from "@/components/TextInput";
import '../app/globals.css';
import AverageCommonButton from "./AverageCommonButton";
import React, { useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import CargoModal from "./CargoModal";
import { cadastroUser } from "@/app/actions/users/cadastroUsuario";
import { listarCargo } from "@/app/actions/users/listarCargo";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { buscarIdAdmin } from "@/app/actions/users/buscarIdAdmin";



const FormCadastroUsuario = ({ emailAdmin }: { emailAdmin: string }) => {
    const [nomeUsuario, setNomeUsuario] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [registro, setRegistro] = React.useState('');
    const [cargo, setCargo] = React.useState<number | null>(null);
    const [administrador, setAdministrador] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [cargoOptions, setCargoOptions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inicioExpediente, setInicioExpediente] = useState<Date | null>(null);
    const [fimExpediente, setFimExpediente] = useState<Date | null>(null);
    const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [admin, setAdmin] = React.useState<number | undefined>(undefined);

    const [isCadastrado, setCadastro] = useState<boolean>(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleInicioExpedienteChange = (date: Date | null) => {
        if (date) {
            const formattedTime = dayjs(date).format('HH:mm');
            
            console.log(formattedTime);
            setInicioExpediente(date);
        }

       

    };
    const handleFimExpedienteChange = (date: Date | null) => {
        if (date) {
            const formattedTime = dayjs(date).format('HH:mm');

          
            console.log(formattedTime);
            setFimExpediente(date);
            
        }

        

    };

    
    const handleCheckboxChange = (isChecked: boolean) => {
        setCheckboxChecked(isChecked);
        console.log('O checkbox está selecionado?', isChecked);
    };

    
    const handleChange = (value: string | null) => {
        console.log('Novo valor selecionado:', value);
        setSelectedValue(value);
    };


    
    useEffect(() => {
      const carregarOpcoesCargo = async () => {
        try {
          const opcoes = await listarCargo();
          setCargoOptions(opcoes);
        } catch (error) {
          console.error("Erro ao carregar opções de cargo:", error);
        }
      };
  
      carregarOpcoesCargo();
    }, []);
    
    const handleSubmit = async () => {
        setAdministrador(emailAdmin);
        //console.log("Inicio do Expediente:", inicioExpediente);
        //console.log("Fim do Expediente:", fimExpediente);
        const adminId = await buscarIdAdmin(administrador);
        if (adminId  !== undefined) {
            // Agora você pode usar adminId.tb_administrador_id sem problemas
            const administradorId = adminId.tb_administrador_id;
            console.log("deu certo o admin");
            if(cargo !== null && inicioExpediente !== null && fimExpediente !== null) {
                const mensagem = await cadastroUser(nomeUsuario, email, registro, cargo, 
                    administradorId, inicioExpediente, fimExpediente);
                    setMessage(mensagem);
                    console.log(message);
                    console.log(administradorId);
                    
            }
            if(cargo !== null){
                const mensagem = await cadastroUser(nomeUsuario, email, registro, cargo);
                setMessage(mensagem);
                console.log(message);
                console.log(administradorId);
            }

            setCadastro(true)
            
          }else{
            console.log("deu errado o admin");
            console.log(administrador);
          }
        
        console.log("Botão clicado!");
    }
        
    const handleClick = () => {
        
        console.log('Botão clicado!');
    };

    const handleChangeIndex = (index: number) => {
        const idCargo = index + 1;
        console.log('Índice do item selecionado:', idCargo);
        setCargo(idCargo);
      };

    return (
        <div className="relative flex justify-center items-center">
            <div className=" flex flex-col items-center ">
                <h2 className="text-cor-texto-principal/80 text-3xl text-center tracking-widest">Cadastro de Usuários</h2>
                <br></br>
                {isCadastrado ? (
        
                                <>
                                <Alert severity="success" >{message}</Alert>
                                
                                </>

                ):(
                            <></>
                 )}
                <div className=" mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Nome do Usuário*"} value={nomeUsuario} onChange={setNomeUsuario} />
                </div>
                <div className="mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Email*"} value={email} onChange={setEmail} />
                </div>
                <div className=" mt-3 -ml-40 ">
                    <CheckboxLabel color={"light-blue"} label={"Administrador"} onCheckboxChange={handleCheckboxChange} />
                </div>
                <div className="mt-4">
                    <InputSimples color={"white"} size={"lg"} label={"Registro*"} value={registro} onChange={setRegistro} />
                </div>
                <div className="mt-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker
                                ampm={false}
                                label="Inicio do Expediente"
                                value={inicioExpediente}
                                onChange={handleInicioExpedienteChange}
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                    '& .MuiSvgIcon-root': { color: 'white' },
                                    '& .MuiInputBase-input': { color: 'white' },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className="mt-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker
                                ampm={false}
                                label="Fim do Expediente"
                                value={fimExpediente}
                                onChange={handleFimExpedienteChange}
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                    '& .MuiSvgIcon-root': { color: 'white' },
                                    '& .MuiInputBase-input': { color: 'white' },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className="mt-4 flex">
                <SelectDefault value={selectedValue} onChange={handleChange} onChangeIndex={handleChangeIndex} options={cargoOptions} />

                    <button onClick={handleButtonClick} className="bg-light-blue-900 mt-2 h-10 text-white p-2 rounded">
                        +Cargo
                    </button>

                    <CargoModal isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
                <div className="flex justify-center">
                    <AverageCommonButton label="Cadastrar" onClick={handleSubmit} />

                </div>
                
                        </div>
                        
                    </div>
                    
                );
}

export default FormCadastroUsuario;