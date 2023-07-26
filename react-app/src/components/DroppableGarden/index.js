import { useDrop } from 'react-dnd';
import { updateFavoritePlant } from '../../store/favorite';

function DroppableGarden({ gardenName, dispatch }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'plant',
    drop: (item, monitor) => {
      const { plant, favorite } = monitor.getItem();
      dispatch(updateFavoritePlant(favorite.id, gardenName));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop}>
      <h2>{gardenName}</h2>
      {/*... Render garden details ... */}
    </div>
  );
}

export default DroppableGarden
