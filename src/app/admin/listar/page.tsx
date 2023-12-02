'use client';
import { buscarCargo } from '@/app/actions/users/buscarCargo';
import { listarAdmin } from '@/app/actions/users/listarAdmin';
import { listarProfSaude } from '@/app/actions/users/listarProfSaude';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ExpandingList from '@/components/ExpandingList';
import Navbar from '@/components/NavBar';
import SignOut from '@/components/SignOut';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Admin {
  tb_administrador_id: number;
  tb_administrador_nome: string | null;
  tb_administrador_email: string | null;
  tb_administrador_senha: string | null;
  tb_administrador_cargoFK: number | null;
}
interface ProfSaude {
  tb_profissionalSaude_id: number;
  tb_profissionalSaude_nome: string | null;
  tb_profissionalSaude_registro: string | null;
  tb_profissionalSaude_email: string | null;
  tb_profissionalSaude_senha: string | null;
  tb_profissionalSaude_expedienteInicio: Date | null;
  tb_profissionalSaude_expedienteFim: Date | null;
  tb_profissionalSaude_admFK: number | null;
  tb_profissionalSaude_cargoFK: number | null;
}
const Home: React.FC = async () => {
  
  
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [cargoNome, setCargoNome] = React.useState<string[]>([]);
  const [adminIndex, setAdminIndex] = useState(0); 
  const [profSaude, setProfSaude] = useState<ProfSaude[]>([]);
  const [profSaudeIndex, setProfSaudeIndex] = useState(0); 
  const [medicoCargoNome, setMedicoCargoNome] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  

  useEffect(() => {

    
    // Função assíncrona para buscar os administradores
    const fetchAdmins = async () => {
      try {
        const adminData = await listarAdmin();
        console.log('Número de elementos em adminData:', adminData.length);
        console.log('adminData:', adminData);
        setAdmins(adminData);
        if (adminIndex < adminData.length) {
          console.log("bom dia");
          if (adminData.length > 0) {
            const lastAdmin = adminData[adminIndex];
            // Verifique se a propriedade desejada está presente antes de acessar
            if (lastAdmin.tb_administrador_cargoFK !== null) {
              const cargo = await buscarCargo(lastAdmin.tb_administrador_cargoFK);
              setCargoNome(attCargoNome => [...attCargoNome, cargo?.tb_cargo_nome || '']);
            }
            setAdminIndex(adminIndex +1);
          }
        }
        
      } catch (error) {
        console.error('Erro ao buscar administradores:', error);
      }
    };

    

    const fetchProfSaude = async () => {
      try {
        const profSaudeData = await listarProfSaude();
        console.log('Número de elementos em adminData:', profSaudeData.length);
        console.log('adminData:', profSaudeData);
        setProfSaude(profSaudeData);
        if (profSaudeIndex < profSaudeData.length) {
          console.log("boa tarde");
          if (profSaudeData.length > 0) {
            const lastProfSaude = profSaudeData[profSaudeIndex];
            // Verifique se a propriedade desejada está presente antes de acessar
            if (lastProfSaude.tb_profissionalSaude_cargoFK !== null) {
              const cargo = await buscarCargo(lastProfSaude.tb_profissionalSaude_cargoFK);
              setMedicoCargoNome(attCargoNome => [...attCargoNome, cargo?.tb_cargo_nome || '']);
            }
            setProfSaudeIndex(profSaudeIndex +1);
          }
        }
        
      } catch (error) {
        console.error('Erro ao buscar administradores:', error);
      }
    };
    
    // Chame a função para buscar os administradores
    
    fetchAdmins();
    fetchProfSaude();
    
    
  }, [adminIndex]);

  const fetchData = async () =>{
    try {
      const session = await getServerSession(authOptions);
      return session
    } catch (error) {
      console.log('Erro ao criar uma sessão no servidor', error);
    }
  }

  const session = await fetchData();

  

  
  
  const itemsA = admins.map((admin, index) => ({
    id: admin.tb_administrador_id,
    image: '/img/user.png',
    title: admin.tb_administrador_nome || '',
    subtitle: cargoNome[index] || '', // Usando o índice correspondente
  }));

  const itemsB = profSaude.map((medico, index) => ({
    id: medico.tb_profissionalSaude_id,
    image: '/img/user.png',
    title: medico.tb_profissionalSaude_nome || '',
    subtitle: medicoCargoNome[index] || '', // Usando o índice correspondente
  }));
  
  const filteredItemsA = itemsA.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItemsB = itemsB.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (

    
          
    <> 
            {session && session.user?.email ? (
              <>
                <div className="w-full flex flex-col min-h-screen">

                {/* Navbar no topo */}
                <Navbar logoSrc="/img/cardiogram.png"/>
                  <div className="w-full flex flex-col min-h-screen items-center justify-center">
                    <input
                        type="text"
                        placeholder="Pesquisar usuário"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 mb-4 border border-gray-300 rounded"
                      />
                    {/* Conteúdo centralizado no meio */}
                    <ExpandingList items={filteredItemsA} />
                    <ExpandingList items={filteredItemsB} />
                    
                  </div>
                
                  </div>
              </>
            ): (
              <>
                <SignOut />
              </>
            )}
    </>

);
}

export default Home;
