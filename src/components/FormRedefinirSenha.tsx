'use client';
import { CheckboxLabel } from "@/components/CheckBox";
import SelectDefault from "@/components/Select";
import { InputSimples } from "@/components/TextInput";
import '../app/globals.css';
import AverageCommonButton from "./AverageCommonButton";
import React from "react";

import { InputPasswordSimples } from "./TextInputPassword";
import { alterarSenhaUsuarioPorEmail } from "@/app/actions/users/alterarSenhaUsuarioPorEmail";
import { buscarProfissionalSaudePorEmail } from "@/app/actions/users/buscarProfSaudePorEmail";
import { useRouter } from "next/navigation";
import { buscarAdminPorEmail } from "@/app/actions/users/buscarAdminPorEmail";


const FormRedefinirSenha = () => {

    
	const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    

    
    const handleSubmit = async () => {

        alterarSenhaUsuarioPorEmail(email,password);

        console.log('senha alterada com sucesso!');

        const isProf = await buscarProfissionalSaudePorEmail(email);

        const isAdmin = await buscarAdminPorEmail(email);

        if(isProf){
            router.refresh();
            router.push("./medico/home/");
            
        }

        if (isAdmin){
            router.refresh();
            router.push("./admin/home/");
        }
      
    }
        
    

    return (
        <div className="relative flex justify-center items-center">
            <div className=" flex flex-col items-center ">
                <h2 className="text-cor-texto-principal/80 text-3xl text-center tracking-widest">Refinição de Senha</h2>
                <div className=" mt-9">
                    <InputSimples color={"white"} size={"lg"} label={"Email*"} value={email} onChange={setEmail} />
                </div>
                <div className="mt-9">
                    <InputPasswordSimples color={"white"} size={"lg"} label={"Senha*"} value={password} onChange={setPassword} />
                </div>
                <div className="mt-9">
                    <InputPasswordSimples color={"white"} size={"lg"} label={"Confirme a Senha*"} value={passwordConfirm} onChange={setPasswordConfirm} />
                </div>
                <div className="flex justify-center">
                    <AverageCommonButton label="Redefinir" onClick={handleSubmit} />
                    
                </div>
                
            </div>
            
        </div>
        
    );
}

export default FormRedefinirSenha;