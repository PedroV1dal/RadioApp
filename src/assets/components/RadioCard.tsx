import React from 'react';
import { Radio } from '../types/Radio';

interface RadioCardProps {
  radio: Radio;
  onEdit: () => void;
  onDelete: () => void;
}

export const RadioCard: React.FC<RadioCardProps> = ({ radio, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 mt-4 flex items-center">
      <div className="h-4 w-4 bg-green-500 rounded-full mr-4"></div>
      <div>
        <h3 className="font-bold">{radio.name}</h3>
        <p>{radio.country}</p>
        <p>{radio.state}</p>
      </div>
      <div className="ml-auto">
        <button
          className="text-blue-500 hover:text-blue-600 mr-2"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};


