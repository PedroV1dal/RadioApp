import React, { useState, useEffect } from "react";
import {
  MagnifyingGlass,
  // Trash,
  // PencilSimple,
  // List,
} from "@phosphor-icons/react";
import axios from "axios";

import { Radio } from "./assets/types/Radio";
import { FavoriteRadio } from "./assets/components/FavoriteRadio";
import { SearchMenu } from "./assets/components/SearchMenu";

const App: React.FC = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [searchRadioOptions, setSearchRadioOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRadios, setTotalRadios] = useState(0);
  const [favoriteRadios, setFavoriteRadios] = useState<Radio[]>([]);
  const [editingRadio, setEditingRadio] = useState<Radio | null>(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(
          `https://de1.api.radio-browser.info/json/stations/search?limit=6&offset=${(currentPage - 1) * 10
          }`
        );
        setRadios(response.data);
        setTotalRadios(response.headers["x-total-count"]);
      } catch (error) {
        console.log("Error fetching radios:", error);
      }
    };
    fetchRadios();
  }, [currentPage]);

  const handleSearchRadioOptions = () => {
    setSearchRadioOptions(true);
  };

  const handleCloseMenu = () => {
    setSearchRadioOptions(false);
  };

  const handleAddToFavorites = (radio: Radio) => {
    const isAlreadyAdded = favoriteRadios.some(
      (favRadio) => favRadio.stationuuid === radio.stationuuid
    );

    if (!isAlreadyAdded) {
      setFavoriteRadios((prevFavorites) => [...prevFavorites, radio]);
    }
  };

  const handleEditRadio = (radio: Radio) => {
    setEditingRadio(radio);
    setEditedName(radio.name);
  };

  const handleSaveEdit = () => {
    if (editingRadio) {
      const updatedRadio = { ...editingRadio, name: editedName };
      const updatedFavoriteRadios = favoriteRadios.map((favRadio) =>
        favRadio.stationuuid === editingRadio.stationuuid ? updatedRadio : favRadio
      );
      setFavoriteRadios(updatedFavoriteRadios);
      setEditingRadio(null);
      setEditedName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingRadio(null);
    setEditedName("");
  };

  const handleRemoveFromFavorites = (radio: Radio) => {
    setFavoriteRadios((prevFavorites) =>
      prevFavorites.filter((favRadio) => favRadio.stationuuid !== radio.stationuuid)
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="pt-6 pb-6">
        <h1 className="flex justify-center text-3xl font-bold text-white">
          Radio App
        </h1>
        <div className="flex justify-between text-white max-w-3xl mx-auto pt-2">
          <p>FAVORITE RADIOS</p>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleSearchRadioOptions}
          >
            <MagnifyingGlass size={26} className="text-intenseBlue" />
            <p className="ml-2">Search Stations</p>
          </div>
        </div>
        {favoriteRadios.length > 0 && (
          <div className="bg-bluishGray max-w-3xl mx-auto rounded mt-2">
            {favoriteRadios.map((radio) => (
              <FavoriteRadio
                key={radio.stationuuid}
                radio={radio}
                editingRadio={editingRadio}
                editedName={editedName}
                onEditRadio={handleEditRadio}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onRemoveFromFavorites={handleRemoveFromFavorites}
              />
            ))}
          </div>
        )}
      </div>

      {searchRadioOptions && (
        <SearchMenu
          radios={radios}
          currentPage={currentPage}
          totalRadios={totalRadios}
          onAddToFavorites={handleAddToFavorites}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          onCloseMenu={handleCloseMenu}
        />
      )}
    </>
  );
};

export default App;
