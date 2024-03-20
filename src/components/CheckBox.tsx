'use client';
import React from 'react';
import { color } from "@material-tailwind/react/types/components/checkbox";
import { Checkbox } from "./materialTailwindExports";

interface CheckBoxProps {
  color: color;
  label?: string;
  onCheckboxChange: (isChecked: boolean) => void;
}

export function CheckboxLabel(props: CheckBoxProps) {
  const { color, label, onCheckboxChange } = props;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheckboxChange(isChecked);
  };

  return (
    <Checkbox
      label={label}
      color={color}
      crossOrigin={undefined}
      labelProps={{
        className: "text-gray-50",
      }}
      onChange={handleCheckboxChange}
    />
  );
}
