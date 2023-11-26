import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Edit, Info, Trash2 } from 'react-feather';
import { InputSimples } from './TextInput';
import AverageCommonButton from './AverageCommonButton';
import  SelectDefault  from "@/components/Select";
import { listarCargo } from '@/app/actions/users/listarCargo';
import CargoModal from './CargoModal';
import '../app/globals.css';
import { buscarAdmin } from '@/app/actions/users/buscarAdmin';
import { buscarProfissionalSaude } from '@/app/actions/users/buscarProfSaude';
import { alterarProfSaude } from '@/app/actions/users/alterarProfSaude';
import { alterarAdmin } from '@/app/actions/users/alterarAdmin';

interface ExpandingListProps {
  items: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
  }[];
}

const ExpandingList: React.FC<ExpandingListProps> = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cargoSelecionado, setCargoSelecionado] = useState<number | undefined>();

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

  const [nomeUsuario, setNomeUsuario] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [registro, setRegistro] = React.useState('');
    const [cargo, setCargo] = React.useState<number>(0);
    const [administrador, setAdministrador] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [admin, setAdmin] = React.useState<number | undefined>(undefined);
    const [cargoOptions, setCargoOptions] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const verificarItem = async (itemId: number, cargoN: string) => {
      console.log(cargoN);
      if(cargoN === "Médico" || cargoN === "Enfermeiro"){
        if (itemId !== null) {
          const profSaudeData = await buscarProfissionalSaude(itemId);
          if (profSaudeData !== undefined) {
            setExpandedItemFields({
              ...expandedItemFields,
              nomeUsuario: profSaudeData.tb_profissionalSaude_nome || '',
              email: profSaudeData.tb_profissionalSaude_email || '',
              registro: profSaudeData.tb_profissionalSaude_registro || '',
            });
            const cargoIncial = profSaudeData.tb_profissionalSaude_cargoFK;
            if(cargoIncial !== null){
              setCargoSelecionado(cargoIncial -1);
            }
          }
        }
      }else{if (itemId !== null) {
        const admData = await buscarAdmin(itemId);
        if (admData !== undefined) {
          setExpandedItemFields({
            ...expandedItemFields,
            nomeUsuario: admData.tb_administrador_nome || '',
            email: admData.tb_administrador_email || '',
          });
          const cargoIncial = admData.tb_administrador_cargoFK;
          if(cargoIncial !== null){
            setCargoSelecionado(cargoIncial -1);
          }
          
        }
        else{
          
        }
      }}
      
    };
    
    const [expandedItemFields, setExpandedItemFields] = useState({
      nomeUsuario: '',
      email: '',
      registro: '',
    });
    
    const handleChange = (value: string | null) => {
        console.log('Novo valor selecionado:', value);
        setSelectedValue(value);//aqui passar o id do cargo
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

  const handleExpandAsync = async (itemId: number, cargoN: string) => {
    setExpandedItemId(itemId === expandedItemId ? null : itemId);
    await verificarItem(itemId, cargoN);
  };



  const handleChangeIndex = (index: number) => {
    const idCargo = index + 1;
    console.log('Índice do item selecionado:', idCargo);
    setCargo(idCargo);
    setCargoSelecionado(index);
  };

  const handleClick = async(itemId: number, cargoN: string) => {
    if(cargoSelecionado !== undefined){
      const cargoNum = cargoSelecionado +1;
      if(cargoN === "Médico" || cargoN === "Enfermeiro"){
        alterarProfSaude(itemId, expandedItemFields.nomeUsuario, expandedItemFields.email,
       expandedItemFields.registro, cargoNum);
       console.log("Profissional da saude alterado");
      }else{
        alterarAdmin(itemId, expandedItemFields.nomeUsuario, expandedItemFields.email, cargoNum);
        console.log("Admin alterado")
      }

    }
    
  
    
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
          <div className="w-48">
            <h3 className="text-lg font-semibold text-cor-texto-principal">{item.title}</h3>
            <p className="text-gray-500">{item.subtitle}</p>
          </div>
          <div className="flex space-x-2 mt-2">
            <button
              className=" pr-4 py-2 rounded cursor-pointer fixed-button"
              onClick={() => handleExpandAsync(item.id, item.subtitle)}
            >
              {expandedItemId === item.id ? <Edit size={36} /> : <Edit size={36} color='orange'/>}
            </button>
            
            <button className="flex items-center pl-2 pr-4 rounded cursor-pointer fixed-button">
              <Trash2 size={36} color='orangered' />
            </button>
          </div>
          {expandedItemId === item.id && (
            <div className="mt-2 w-full flex flex-col">
              <div className="relative flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <div className="mt-9">
                  <InputSimples color={"white"} size={"lg"} label={"Nome do Usuário*"} value={expandedItemFields.nomeUsuario} 
                  onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, nomeUsuario: value }))} />
                  </div>
                  <div className="mt-4">
                  <InputSimples color={"white"} size={"lg"} label={"Email*"} value={expandedItemFields.email} 
                   onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, email: value }))} />
                  </div>
                  <div className="mt-4">
                  <InputSimples color={"white"} size={"lg"} label={"Registro*"} value={expandedItemFields.registro} 
                  onChange={(value) => setExpandedItemFields((prevState) => ({ ...prevState, registro: value }))}/>
                  </div>
                  <div className="mt-4 flex">
                  <SelectDefault value={selectedValue} onChange={handleChange} onChangeIndex={handleChangeIndex} selectedIndex={cargoSelecionado} options={cargoOptions} />
                  <button onClick={handleButtonClick} className="bg-light-blue-900 mt-2 h-10 text-white p-2 rounded">
                        +Cargo
                    </button>
                    <CargoModal isOpen={isModalOpen} onClose={handleCloseModal} />
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <AverageCommonButton label="Concluir" onClick={() => handleClick(item.id, item.subtitle)} />
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
