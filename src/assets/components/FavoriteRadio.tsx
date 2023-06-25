import React from "react";
import { Trash, PencilSimple } from "@phosphor-icons/react";
import { Radio } from "../types/Radio";

interface FavoriteRadioProps {
  radio: Radio;
  editingRadio: Radio | null;
  editedName: string;
  onEditRadio: (radio: Radio) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemoveFromFavorites: (radio: Radio) => void;
}

const FavoriteRadio: React.FC<FavoriteRadioProps> = ({
  radio,
  editingRadio,
  editedName,
  onEditRadio,
  onSaveEdit,
  onCancelEdit,
  onRemoveFromFavorites,
}) => {
  const handleEditClick = () => {
    onEditRadio(radio);
  };

  const handleRemoveClick = () => {
    onRemoveFromFavorites(radio);
  };

  return (
    <div key={radio.stationuuid} className="mt-4 bg-white p-4 rounded flex items-center">
      <div className="mr-4">
        <audio src={radio.url} controls className="w-20" />
      </div>
      <div className="flex-grow">
        {editingRadio?.stationuuid === radio.stationuuid ? (
          <input
            type="text"
            value={editedName}
            className="border rounded px-2 py-1 mr-2"
          />
        ) : (
          <h3 className="text-lg font-bold">{radio.name}</h3>
        )}
        <p className="text-sm">{radio.country}</p>
      </div>
      <div className="flex items-center ml-auto">
        {editingRadio?.stationuuid === radio.stationuuid ? (
          <>
            <button
              className="text-green-500 hover:text-green-700"
              onClick={onSaveEdit}
            >
              Save
            </button>
            <button
              className="text-red-500 hover:text-red-700 ml-2"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <PencilSimple
            size={20}
            className="text-blue-500 cursor-pointer mr-2"
            onClick={handleEditClick}
          />
        )}
        <Trash
          size={20}
          className="text-red-500 cursor-pointer"
          onClick={handleRemoveClick}
        />
      </div>
    </div>
  );
};

export { FavoriteRadio }
