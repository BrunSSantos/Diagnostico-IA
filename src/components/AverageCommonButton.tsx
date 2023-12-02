'use client';
import React from 'react';

interface AverageCommonButtonProps {
    label: string;
    onClick: () => void;
    
  }
  
  const AverageCommonButton: React.FC<AverageCommonButtonProps> = ({ label, onClick }) => {
    return (
        <button className="border-none outline-none bg-cor-texto-principal/90 mt-8 w-28 h-10 rounded font-semibold 
        cursor-pointer hover:bg-light-blue-700  hover:text-gray-200/80 active:opacity-80" type="submit" 
        value="Cadastrar" onClick={onClick} >
        {label}
        
        
        
      
        </button>
    );
  };
  
  export default AverageCommonButton;