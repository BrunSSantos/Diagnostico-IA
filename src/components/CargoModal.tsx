'use client';
import { cadastroCargo } from '@/app/actions/users/cadastroCargo';
import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CargoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    const message = await cadastroCargo(inputValue);
    setMessage(message);
  };

  const handleModalClose = () => {
    setInputValue('');
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="absolute w-1/3 bg-white p-4 rounded shadow" style={{ maxWidth: '240px' }}>
        <button onClick={handleModalClose} className="absolute top-2 right-2 text-gray-800 hover:text-gray-700">
          Fechar
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Digite o cargo..."
          className="w-full mt-8 p-2 border border-gray-300 rounded mb-2"
        />
        <button onClick={handleButtonClick} className="bg-blue-500 text-white p-2 rounded w-full">
          Confirmar
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CargoModal;
