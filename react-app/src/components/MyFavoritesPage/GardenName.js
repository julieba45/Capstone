import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./GardenName.css";


const GardenName = ({ gardenName, onNameUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(gardenName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = () => {
    onNameUpdate(gardenName, newName);
    setIsEditing(false);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      {isEditing ? (
         <div>
        <input
        className='editgarden-inputarea'
          type="text"
          value={newName}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress}
        />
          <button className="update-garden-name"onClick={handleSubmit}>Update</button>
        </div>
      ) : (
        <div className='edit-gardenname'>
          <NavLink className="favorite-garden-name" to={`/garden/${gardenName}`}>{gardenName}</NavLink>
          <button className="edit-button"onClick={handleEditClick}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default GardenName;
