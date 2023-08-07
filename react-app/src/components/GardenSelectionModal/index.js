import React, {useState} from "react";
import "./GardenSelectionModal.css"

const GardenSelectionModal = ({onGardenSelect, gardenNames, plantImage, plantName}) => {
    const [newGardenName, setNewGardenName] = useState('');

    const handleNewGardenSubmit = (e) => {
        e.preventDefault()
        if(newGardenName.trim() === ''){
            alert('Garden name cannot be empty')
            return;
        }
        onGardenSelect(newGardenName)
        setNewGardenName('');
    }
    return (
        <div className="garden-modal-container">
            <div className="garden-modal-header">
                <h2>Add this item to a list</h2>
            </div>
            <div className="garden-modal-content">
                <div className="garden-modal-image">
                    <img src={plantImage} alt={plantName} />
                </div>
                <div className="garden-modal-details">
                    <h3>{plantName}</h3>
                    {gardenNames.map((gardenName, i) =>
                        <button className="default-garden-btn" key={i} onClick={() => onGardenSelect(gardenName)}>
                            {gardenName}
                        </button>
                    )}
                    <form onSubmit={handleNewGardenSubmit}>
                        <input
                            className="selection-modal-input"
                            type="text"
                            placeholder="New Garden Name"
                            value={newGardenName}
                            onChange={(e) => setNewGardenName(e.target.value)}
                        />
                        <button className="delete-review-btn"type="submit">Create New Garden</button>

                    </form>
                </div>
            </div>
        </div>
    )

}

export default GardenSelectionModal
