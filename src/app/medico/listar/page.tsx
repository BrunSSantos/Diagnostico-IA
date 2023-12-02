'use client';
import { listarDiagnostico } from '@/app/actions/diagnostico/listarDiagnostico';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ExpandingListDiag from '@/components/ExpandingListDiag';
import ExpandingList from '@/components/ExpandingListDiag';
import Navbar from '@/components/NavBar';
import SignOut from '@/components/SignOut';
import { getServerSession } from 'next-auth';
import React, {useEffect , useState } from 'react';


interface Diagnostico {
  tb_diagnostico_id: number;
  tb_diagnostico_img: string | null;
  tb_diagnostico_nomePaciente: string | null;
  tb_diagnostico_desc: string | null;
}

const Home: React.FC = async () => {
  

  
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
  const [diagnosticoIndex, setDiagnosticoIndex] = useState(0); 

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Função assíncrona para buscar os administradores
    const fetchDiagnosticos = async () => {
      try {
        const diagnosticoData = await listarDiagnostico();
        console.log('Número de elementos em DiagnosticoData:', diagnosticoData.length);
        console.log('DiagnosticoData:', diagnosticoData);
        setDiagnosticos(diagnosticoData);
        if (diagnosticoIndex < diagnosticoData.length) {
          console.log("bom dia");
          if (diagnosticoData.length > 0) {
            const lastAdmin = diagnosticoData[diagnosticoIndex];
            // Verifique se a propriedade desejada está presente antes de acessar
           
            setDiagnosticoIndex(diagnosticoIndex +1);
          }
        }
        
      } catch (error) {
        console.error('Erro ao buscar diagnósticos:', error);
      }

      
    };
    fetchDiagnosticos();
  },[diagnosticoIndex]);

  const fetchData = async () =>{
    try {
      const session = await getServerSession(authOptions);
      return session
    } catch (error) {
      console.log('Erro ao criar uma sessão no servidor', error);
    }
  }

  const session = await fetchData();

  const itemsA = diagnosticos.map((diag) => ({
    id: diag.tb_diagnostico_id,
    image: '/img/raiox-covid.png',
    title: diag.tb_diagnostico_desc || '',
    subtitle: diag.tb_diagnostico_nomePaciente || ''
  }));

  const filteredItemsA = itemsA.filter((item) =>
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
                            placeholder="Pesquisar diagnostico"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm
                              (e.target.value)}
                            className="p-2 mb-4 border border-gray-300 rounded"
                          />
                        {/* Conteúdo centralizado no meio */}
                        <ExpandingListDiag items={filteredItemsA} />
                        
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
};

export default Home;
