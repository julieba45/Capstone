import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const GardenName = ({ gardenName, onNameUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(gardenName);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onNameUpdate(gardenName, newName);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <React.Fragment>
          <NavLink className="favorite-garden-name" to={`/garden/${gardenName}`}>{gardenName}</NavLink>
          <button onClick={handleEditClick}>Edit</button>
        </React.Fragment>
      )}
    </div>
  );
};

export default GardenName;
