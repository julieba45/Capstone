

const GardenSelectionModal = ({onGardenSelect, gardenNames}) => {
    return (
        <div>
            <h2>Select a Garden</h2>
            {gardenNames.map((gardenName, i) =>
                <button key={i} onClick={() => onGardenSelect(gardenName)}>
                    {gardenName}
                </button>
            )}
        </div>
    )

}

export default GardenSelectionModal
