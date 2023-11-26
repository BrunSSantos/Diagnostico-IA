import React, { useState, useEffect } from 'react';
import '../app/globals.css';

interface MyComponentProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  onChangeIndex?: (index: number) => void;
  options: string[];
  selectedIndex?: number; // Adicionando a propriedade selectedIndex
}

const SelectDefault: React.FC<MyComponentProps> = ({
  value,
  onChange,
  onChangeIndex,
  options,
  selectedIndex,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(value || null);

  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex >= 0 && selectedIndex < options.length) {
      setSelectedOption(options[selectedIndex]);
    }
  }, [selectedIndex, options]);

  const handleOptionClick = (option: string, index: number) => {
    setSelectedOption(option);

    if (onChange) {
      onChange(option);
    }

    if (onChangeIndex) {
      onChangeIndex(index); // Chama a função de retorno de chamada com o índice selecionado
    }

    handleDropdownClick();
  };

  const handleDropdownClick = () => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  };

  return (
    <div className='dropdown relative mt-2 w-48 h-10'>
      <input
        type='text'
        className='absolute w-full h-full border-b-2 cursor-pointer bg-transparent
            pt-2 pr-5 pl-2 text-white'
        placeholder='Selecione o Cargo*'
        readOnly
        value={selectedOption || ''}
        onClick={handleDropdownClick}
      />
      <div className='options absolute top-16 w-full bg-white shadow-cor-texto-principal/10 rounded-lg overflow-hidden'>
        {options.map((option, index) => (
          <div
            key={index}
            className={`relative pt-1 text-lg pl-2 ${index === selectedIndex ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option, index)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDefault;
