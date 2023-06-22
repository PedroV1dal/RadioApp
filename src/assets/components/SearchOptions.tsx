import React from 'react';

interface SearchOptionsProps {
  onClose: () => void;
  searchQuery: string;
}

export const SearchOptions: React.FC<SearchOptionsProps> = ({ onClose, searchQuery }) => {
  // Lógica para buscar e exibir as rádios de acordo com as opções de pesquisa

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Search Options</h2>
          <button className="text-red-500 hover:text-red-600" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4">
          {/* Exibir lista de rádios encontradas */}
          <p>Radio 1</p>
          <p>Radio 2</p>
          <p>Radio 3</p>
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

