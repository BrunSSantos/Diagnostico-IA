import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Edit, Info, Trash2, Share } from 'react-feather';
import { InputSimples } from './TextInput';
import AverageCommonButton from './AverageCommonButton';
import { alterarDiagnostico } from '@/app/diagnostico/alterarDiagnostico';


interface ExpandingListProps {
  items: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
  }[];
}

const ExpandingListDiag: React.FC<ExpandingListProps> = ({ items }) => {
  
  
  const [nomePaciente, setNomePaciente] = React.useState('')
  const [descricao, setDescricao] = React.useState('')
  const [image, setImage] = React.useState('');
  const [id, setId] = React.useState<Number | undefined>(undefined);
    

    
  const [expandedItemFields, setExpandedItemFields] = useState({
    nomePaciente: '',
    descricao: '',
    
  });
   
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  const handleExpand = (itemId: number) => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
  };

  const handleClick = async(itemId: number, title: string, subtitle: string) => {
        alterarDiagnostico(itemId, title, subtitle);   
  };

  return (
    <div className="expanding-list">
      {items.map((item) => (
        <div
          key={item.id}
          className={`h-auto w-120 bg-gray-700/20 mb-4 p-4 border-2 border-cor-texto-principal/10 rounded-lg flex space-x-4 flex-wrap ${
            expandedItemId === item.id ? 'expanded' : ''
          }`}
        >
          <img src={item.image} alt={`Image ${item.id}`} className="w-28 mb-2 " />
          <div>
            <h3 className="text-lg font-semibold text-cor-texto-principal">{item.title}</h3>
            <p className="text-gray-500">{item.subtitle}</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className="pl-10 pr-4 py-2 rounded cursor-pointer"
              onClick={() => handleExpand(item.id)}
            >
              {expandedItemId === item.id ? <Edit size={30} /> : <Edit size={30} color='orange'/>}
            </button>

            <button className="flex items-center pl-2 pr-4 rounded cursor-pointer">

              <Share size={30} color='red'></Share>

            </button>
            
            <button className="flex items-center pl-2 pr-4 rounded cursor-pointer">
              <Trash2 size={30} color='orangered' />
            </button>
          </div>
          {expandedItemId === item.id && (
            <div className="mt-2 w-full flex flex-col">
              <div className="relative flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="mt-9">
                  
                      <InputSimples color={"white"} size={"lg"} label={"Nome do Paciente*"} value={expandedItemFields.nomePaciente} 
                   onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, nomePaciente: value }))} />
                  </div>

                  <div className="mt-9">
                  
                      <InputSimples color={"white"} size={"lg"} label={"Descrição*"} value={expandedItemFields.descricao} 
                   onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, descricao: value }))} />
                  </div>
                 
                  
                  <div className="flex justify-center space-x-4 mt-4">
                    <AverageCommonButton label="Concluir" onClick={()=>handleClick(item.id, item.title, item.subtitle)} />
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
