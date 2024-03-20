'use client';
import React from 'react';
import { PerfilMenu } from './Perfil';

interface NavbarProps {
  logoSrc: string;
  //onButtonClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ logoSrc}) => {
  return (
    <nav className="flex justify-between items-center p-4 text-white">
      <div className="flex items-center">
        <img src={logoSrc} alt="Logo" className="h-12 mr-4" />

      </div>
      <div className="ml-96">
        <a href='/medico/home' className='text-white hover:text-indigo-700'>Home</a>
        
        <a href='/medico/diagnostico' className='pl-4 text-white hover:text-indigo-700'>Diagnóstico</a>
        
        <a href='/medico/listar' className='pl-4 text-white hover:text-indigo-700'>Histórico Diagnósticos</a>
      </div>
      <div className="pr-12">
      <PerfilMenu/>
      </div>
      
    </nav>
  );
};

export default Navbar;