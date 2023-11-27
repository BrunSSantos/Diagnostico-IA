import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Edit, Info, Trash2 } from 'react-feather';
import { InputSimples } from './TextInput';
import AverageCommonButton from './AverageCommonButton';
import  SelectDefault  from "@/components/Select";
import { listarCargo } from '@/app/actions/users/listarCargo';

interface ExpandingListProps {
  items: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
  }[];
}

const ExpandingList: React.FC<ExpandingListProps> = ({ items }) => {
  const [nomeUsuario, setNomeUsuario] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [registro, setRegistro] = React.useState('')
    const [cargo, setCargo] = React.useState<number | ''>('');
    const [administrador, setAdministrador] = React.useState('');
    const [message, setMessage] = React.useState('')
    const [admin, setAdmin] = React.useState<number | undefined>(undefined);
    const [cargoOptions, setCargoOptions] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  const handleExpand = (itemId: number) => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
  };

  const handleClick = () => {
    
    console.log('Botão clicado!');
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
          <img src={item.image} alt={`Image ${item.id}`} className="max-w-full mb-2" />
          <div>
            <h3 className="text-lg font-semibold text-cor-texto-principal">{item.title}</h3>
            <p className="text-gray-500">{item.subtitle}</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className="pl-10 pr-4 py-2 rounded cursor-pointer"
              onClick={() => handleExpand(item.id)}
            >
              {expandedItemId === item.id ? <Edit size={36} /> : <Edit size={36} color='orange'/>}
            </button>
            
            <button className="flex items-center pl-2 pr-4 rounded cursor-pointer">
              <Trash2 size={36} color='orangered' />
            </button>
          </div>
          {expandedItemId === item.id && (
            <div className="mt-2 w-full flex flex-col">
              <div className="relative flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="mt-9">
                  <InputSimples color={"white"} size={"lg"} label={"Nome do Usuário*"} value={nomeUsuario} onChange={setNomeUsuario} />
                  </div>
                  <div className="mt-4">
                  <InputSimples color={"white"} size={"lg"} label={"Email*"} value={email} onChange={setEmail} />
                  </div>
                  <div className="mt-4">
                  <InputSimples color={"white"} size={"lg"} label={"Registro*"} value={registro} onChange={setRegistro} />
                  </div>
                  <div className="mt-4">
                  <SelectDefault value={selectedValue} onChange={handleChange} options={cargoOptions} />
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <AverageCommonButton label="Concluir" onClick={handleClick} />
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

export default ExpandingList;
