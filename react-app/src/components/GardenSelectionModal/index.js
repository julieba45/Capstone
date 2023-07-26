import React, {useState} from "react";

const GardenSelectionModal = ({onGardenSelect, gardenNames}) => {
    const [newGardenName, setNewGardenName] = useState('');

    const handleNewGardenSubmit = (e) => {
        e.preventDefault()
        onGardenSelect(newGardenName)
        setNewGardenName('');
    }
    return (
        <div>
            <h2>Select a Garden</h2>
            {gardenNames.map((gardenName, i) =>
                <button key={i} onClick={() => onGardenSelect(gardenName)}>
                    {gardenName}
                </button>
            )}
            <form onSubmit={handleNewGardenSubmit}>
                <input
                    type="text"
                    placeholder="New Garden Name"
                    value={newGardenName}
                    onChange={(e) => setNewGardenName(e.target.value)}
                />
                <button type="submit">Create New Garden</button>

            </form>
        </div>
    )

}

export default GardenSelectionModal
