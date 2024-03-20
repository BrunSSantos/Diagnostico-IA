'use client';
import { listarDiagnostico } from '@/app/actions/diagnostico/listarDiagnostico';
import ExpandingListDiag from '@/components/ExpandingListDiag';
import app from '@/firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import React, {useEffect , useRef, useState } from 'react';


interface Diagnostico {
  tb_diagnostico_id: number;
  tb_diagnostico_img: string | null;
  tb_diagnostico_nomePaciente: string | null;
  tb_diagnostico_desc: string | null;
  tb_diagnostico_resultado: string | null;
  imageUrl?: string;
}



const ListarProfSaude: React.FC = () => {
  const contentRef = useRef(null);
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
  const [diagnosticoIndex, setDiagnosticoIndex] = useState(0); 
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Função assíncrona para buscar os administradores
    const fetchDiagnosticos = async () => {
      try {
       
        const diagnosticoData = await listarDiagnostico();
        console.log('Número de elementos em DiagnosticoData:', diagnosticoData.length);
        console.log('DiagnosticoData:', diagnosticoData);

        
        const diagnosticosComImagens = await Promise.all(diagnosticoData.map(async (diag) => {
        if (diag.tb_diagnostico_img) {
          const storage = getStorage(app);
          const imageRef = ref(storage, `imagens/${diag.tb_diagnostico_img}`);
          const imageUrl = await getDownloadURL(imageRef);
          console.log("texto")
          console.log(imageUrl)
          

          return { ...diag, imageUrl };
        }
        return diag;
      }));

        


        setDiagnosticos(diagnosticosComImagens);
        console.log(diagnosticosComImagens)
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

  const itemsA = diagnosticos.map((diag) => {
    console.log('diag.imageUrl:', diag.imageUrl);
    const image = diag.imageUrl || ''; // Use a URL da imagem, se disponível
    console.log('image:', diag.tb_diagnostico_img);
    return {
      id: diag.tb_diagnostico_id,
      image,
      title: diag.tb_diagnostico_nomePaciente || '',
      subtitle: diag.tb_diagnostico_resultado || '',
    };
  });
  


  console.log(itemsA);

  

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