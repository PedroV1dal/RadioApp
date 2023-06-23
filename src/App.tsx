import React, { useState, useEffect } from "react";
import {
  MagnifyingGlass,
  Trash,
  PencilSimple,
  List,
  Play,
  Pause,
} from "@phosphor-icons/react";
import axios from "axios";

import { Radio } from "./assets/types/Radio";

const App: React.FC = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [searchRadioOptions, setSearchRadioOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRadios, setTotalRadios] = useState(0);
  const [favoriteRadios, setFavoriteRadios] = useState<Radio[]>([]);

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(
          `https://de1.api.radio-browser.info/json/stations/search?limit=8&offset=${(currentPage - 1) * 10
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
              <div key={radio.stationuuid} className="mt-4 bg-white p-4 rounded">
                <div className="flex items-center">
                  <audio src={radio.url} controls className="mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">{radio.name}</h3>
                    <p className="text-sm">{radio.country}</p>
                    <Trash
                      size={20}
                      className="text-red-500 cursor-pointer ml-auto"
                      onClick={() => handleRemoveFromFavorites(radio)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {searchRadioOptions && (
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
            />
          </div>
          <div className="mt-4">
            {radios.map((radio) => (
              <div
                className="bg-bluishGray mt-4 w-80 pt-3 pb-3 pl-3 mx-auto"
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
      )}
    </>
  );
};

export default App;
