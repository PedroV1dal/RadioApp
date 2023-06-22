import React, { useState, useEffect } from 'react';
import { RadioCard } from './assets/components/RadioCard';
import { SearchOptions } from './assets/components/SearchOptions';
import { MagnifyingGlass } from  '@phosphor-icons/react'
import axios from 'axios';

import { Radio } from './assets/types/Radio';


const App: React.FC = () => {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const response = await axios.get(
          'https://de1.api.radio-browser.info/json/stations/search?limit=10'
        );
        setRadios(response.data);
      } catch (error) {
        console.log('Error fetching radios:', error);
      }
    };

    fetchRadios();
  }, []);

  const handleEditRadio = (editedRadio: Radio) => {
    setRadios((prevRadios) => {
      const updatedRadios = prevRadios.map((radio) => {
        if (radio.stationuuid === editedRadio.stationuuid) {
          return editedRadio;
        }
        return radio;
      });
      return updatedRadios;
    });
  };

  const handleDeleteRadio = (deletedRadio: Radio) => {
    setRadios((prevRadios) => {
      const updatedRadios = prevRadios.filter(
        (radio) => radio.stationuuid !== deletedRadio.stationuuid
      );
      return updatedRadios;
    });
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchOptionsToggle = () => {
    setSearchOptionsOpen(!searchOptionsOpen);
  };

  return (
    <>
    <div className=' bg-slate-700 pt-6 pb-6'>
        <h1 className='flex justify-center text-3xl font-bold text-white'>Radio App</h1>
        <div className='flex justify-between text-white max-w-3xl mx-auto'>
          <p>FAVORITE RADIOS</p>
          <div className='flex items-center'>
            <MagnifyingGlass size={26}/>
            <p className='ml-2'>Search Stations</p>
          </div>
        </div>
    </div>
    </>
  );
};

export default App;
