'use client';
import ExpandingList from '@/components/ExpandingListDiag';
import Navbar from '@/components/NavBar';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const initialItems = [
    {
      id: 1,
      image: '/img/raiox-covid.jpg',
      title: 'Covid-19',
      subtitle: 'Fulano',
    },
    // Adicione mais itens conforme necessário
  ];

  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    const filteredItems = initialItems.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setItems(filteredItems);
    setSearchTerm(term);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">

  {/* Navbar no topo */}
  <Navbar logoSrc="/img/cardiogram.png"/>
    <div className="w-full flex flex-col min-h-screen items-center justify-center">
      <input
          type="text"
          placeholder="Pesquisar diagnostico"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded"
        />
      {/* Conteúdo centralizado no meio */}
      <ExpandingList items={items} />
      
    </div>
    </div>
  
  );
};

export default Home;
