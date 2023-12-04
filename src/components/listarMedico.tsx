'use client';
import { listarDiagnostico } from '@/app/actions/diagnostico/listarDiagnostico';
import ExpandingListDiag from '@/components/ExpandingListDiag';
import React, {useEffect , useRef, useState } from 'react';


interface Diagnostico {
  tb_diagnostico_id: number;
  tb_diagnostico_img: string | null;
  tb_diagnostico_nomePaciente: string | null;
  tb_diagnostico_desc: string | null;
}

const ListarProfSaude: React.FC = () => {
  const contentRef = useRef(null);
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

  const itemsA = diagnosticos.map((diag) => ({
    id: diag.tb_diagnostico_id,
    image: diag.tb_diagnostico_img || '',
    title: diag.tb_diagnostico_desc || '',
    subtitle: diag.tb_diagnostico_nomePaciente || '',
  }));

  const filteredItemsA = itemsA.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase())
);
  

  return (
          <>      
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
            </>
  );
};

export default ListarProfSaude;