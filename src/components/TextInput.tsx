'use client';
import { color, size } from "@material-tailwind/react/types/components/input";
import { Input } from "./materialTailwindExports";
import { InputProps} from "@material-tailwind/react";


interface InputSimplesProps {
    color: color; 
    size: size; 
    label?: string;
    value: string;
    onChange: (value: string) => void;
  }
  

export function InputSimples(props: InputSimplesProps) {
    const { color, size, label, value, onChange} = props;
    return (
      <div className="w-72">
        <Input label={label} color={color} size={size} crossOrigin={undefined} value={value} onChange={(e) => onChange(e.target.value)}/>
      </div>
    );
  }
  