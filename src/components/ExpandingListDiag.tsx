import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Edit, Info, Trash2, Share } from 'react-feather';
import { InputSimples } from './TextInput';
import AverageCommonButton from './AverageCommonButton';
import { alterarDiagnostico } from '@/app/diagnostico/alterarDiagnostico';
import { buscarDiagnostico } from '@/app/actions/diagnostico/buscarDiag';
import { Alert } from '@mui/material';
import { excluirDiagnostico } from '@/app/actions/diagnostico/excluirDiagnostico';


interface ExpandingListProps {
  items: {
    id: number;
    image?: string;
    title: string;
    subtitle: string;
  }[];
}

const ExpandingListDiag: React.FC<ExpandingListProps> = ({ items }) => {
  
  
  const [nomePaciente, setNomePaciente] = React.useState('')
  const [descricao, setDescricao] = React.useState('')
  const [resultado, setResultado] = React.useState('')
  const [image, setImage] = React.useState('');
  const [id, setId] = React.useState<Number | undefined>(undefined);
  const [message, setMessage] = React.useState('');
  const [isAlterado, setAlteracao] = useState<boolean>(false);
  const [isExcluido, setExcluido] = useState<boolean>(false);
     

  const verificarItem = async (itemId:number) =>{

        if (itemId !== null) {
            const diag = await buscarDiagnostico(itemId);

            if (diag !== undefined){
                setExpandedItemFields({
                  ...expandedItemFields,
                  nomePaciente: diag.tb_diagnostico_nomePaciente || '',
                  descricao: diag.tb_diagnostico_desc || ''

                })
            }

        }

  }
    

    
  const [expandedItemFields, setExpandedItemFields] = useState({
    nomePaciente: '',
    descricao: '',
    
  });
   
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  const handleExpand = async (itemId: number) => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
    await verificarItem(itemId);
  };

  const handleClickDelete = async (itemId: number)=>{
    if (itemId !== null){

      const mensagem = await excluirDiagnostico(itemId);
      setMessage(mensagem)
      setExcluido(true)
      
 }else{
    console.log('Administrador inválido');
 }
  }

  const handleClick = async(itemId: number) => {

        if(itemId !== null ){
            const mensagem = await alterarDiagnostico(itemId, expandedItemFields.nomePaciente, expandedItemFields.descricao); 
            setMessage(mensagem) 
            setTimeout(() => {
              setAlteracao(true)
          }, 2000);
    
          setAlteracao(false)
    
            
            console.log('Sucesso ao alterar diagnóstico') 
        }else{
          console.error("Erro ao alterar diagnóstico")
        }
  };

  return (
    <div className="expanding-list">

          <div className="flex flex-col items-center">

                      {isExcluido ? (
                        
                        <>
                          <Alert severity="success" >{message}</Alert>
                          <br></br>
                            
                        </>

                        ):(
                                <></>
                        )}
                </div>
      {items.map((item) => (
        <div
          key={item.id}
          className={`h-auto w-120 bg-gray-700/20 mb-4 p-4 border-2 border-cor-texto-principal/10 rounded-lg flex space-x-4 flex-wrap ${
            expandedItemId === item.id ? 'expanded' : ''
          }`}
        >
          <img src={item.image} alt={`Image ${item.image}`} className="w-28 mb-2 " />
          <div className='w-48'>
            <h3 className="text-lg font-semibold text-cor-texto-principal">{item.title}</h3>
            <p className="text-gray-500">{item.subtitle}</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className="flex items-center py-2 rounded cursor-pointer fixed-button-diag"
              onClick={() => handleExpand(item.id)}
            >
              {expandedItemId === item.id ? <Edit size={30} /> : <Edit size={30} color='orange'/>}
            </button>

            <button className="flex items-center rounded cursor-pointer fixed-button-diag">

              <Share size={30} color='red'></Share>

            </button>
            
            <button className="flex items-center rounded cursor-pointer fixed-button-diag" onClick={()=> handleClickDelete(item.id)}>
              <Trash2 size={30} color='orangered' />
            </button>
          </div>
          {expandedItemId === item.id && (
            <div className="mt-2 w-full flex flex-col">
              <div className="relative flex justify-center items-center">
                <div className="flex flex-col items-center">

                {isAlterado ? (
        
                        <>
                          <Alert severity="success" >{message}</Alert>
                            
                        </>

                    ):(
                        <></>
                )}


                  <div className="mt-9">
                  
                      <InputSimples color={"white"} size={"lg"} label={"Nome do Paciente*"} value={expandedItemFields.nomePaciente} 
                   onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, nomePaciente: value }))} />
                  </div>

                  <div className="mt-9">
                  
                      <InputSimples color={"white"} size={"lg"} label={"Descrição*"} value={expandedItemFields.descricao} 
                   onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, descricao: value }))} />
                  </div>
                 
                  
                  <div className="flex justify-center space-x-4 mt-4">
                    <AverageCommonButton label="Concluir" onClick={()=>handleClick(item.id)} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpandingListDiag;
