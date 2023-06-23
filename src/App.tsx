import React, { useState, useEffect } from "react";
import {
  MagnifyingGlass,
  Trash,
  PencilSimple,
  List,
} from "@phosphor-icons/react";
import axios from "axios";

import { Radio } from "./assets/types/Radio";

const App: React.FC = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [searchRadioOptions, setSearchRadioOptions] = useState(false);

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(
          "https://de1.api.radio-browser.info/json/stations/search?limit=10"
        );
        setRadios(response.data);
      } catch (error) {
        console.log("Error fetching radios:", error);
      }
    };
    fetchRadios();
  }, []);

  const handleSearchRadioOptions = () => {
    setSearchRadioOptions(true);
  };

  const handleCloseMenu = () => {
    setSearchRadioOptions(false);
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
        <div className="max-w-3xl mx-auto bg-white pt-2 pb-2 pl-4 pr-2 mt-3 flex">
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          <div className="flex justify-between w-full">
            <div className="text-left ml-4">
              <p className="text-lg font-bold">Nome da Rádio</p>
              <p className="-mt-1">País</p>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <PencilSimple
                  size={26}
                  weight="fill"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Trash size={26} weight="fill" className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchRadioOptions && (
        <div className="fixed top-0 left-0 w-72 h-screen bg-darkGray flex flex-col">
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
              className="w-48 rounded-md pl-4"
            />
          </div>
          <div className="mt-4">
            {radios.map((radio) => (
              <div className="bg-bluishGray mt-4 w-52 pt-3 pb-3 pl-3 mx-auto" key={radio.stationuuid}>
                <p className="text-white">{radio.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
