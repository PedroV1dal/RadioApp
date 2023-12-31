import React, { useState } from "react";
import { List } from "@phosphor-icons/react";
import { Radio } from "../types/Radio";

interface SearchMenuProps {
  radios: Radio[];
  currentPage: number;
  totalRadios: number;
  onAddToFavorites: (radio: Radio) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onCloseMenu: () => void;
}

export const SearchMenu: React.FC<SearchMenuProps> = ({
  radios,
  currentPage,
  totalRadios,
  onAddToFavorites,
  onPreviousPage,
  onNextPage,
  onCloseMenu,
}) => {

  const [searchValue, setSearchValue] = useState("");

  const handleAddToFavorites = (radio: Radio) => {
    onAddToFavorites(radio);
  };

  const handlePreviousPage = () => {
    onPreviousPage();
  };

  const handleNextPage = () => {
    onNextPage();
  };

  const handleCloseMenu = () => {
    onCloseMenu();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Filtra a lista de rádios com base no valor da pesquisa
  const filteredRadios = radios.filter(
    (radio) =>
      radio.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      radio.country.toLowerCase().includes(searchValue.toLowerCase())
  );


  return (
    <div className="fixed top-0 left-0 w-96 h-screen bg-darkGray flex flex-col">
      <div className="ml-auto">
        <List
          size={42}
          className="text-intenseBlue cursor-pointer mt-4 mr-4"
          onClick={handleCloseMenu}
        />
      </div>
      <div className="flex justify-center mx-auto mt-4">
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Search Here"
          className="w-72 rounded-md pl-4"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mt-4">
        {filteredRadios.map((radio) => (
          <div
            className="bg-bluishGray pt-3 pb-3 mt-3 w-80 mx-auto rounded-md pl-3"
            key={radio.stationuuid}
          >
            <p className="text-white text-sm">{radio.name}</p>
            <button
              className="text-white"
              onClick={() => handleAddToFavorites(radio)}
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-96 mb-3 bg-darkGray flex justify-center items-center mt-4">
        <button
          className="mr-2 px-4 py-2 rounded-md bg-intenseBlue text-white disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="ml-2 px-4 py-2 rounded-md bg-intenseBlue text-white disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage * 10 >= totalRadios}
        >
          Next
        </button>
      </div>
    </div>
  );
};


