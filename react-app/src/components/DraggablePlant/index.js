import { useDrag } from 'react-dnd';

function DraggablePlant({ plant, favorite }) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'plant',
      item: { plant, favorite },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {plant.name}
      </div>
    );
}

export default DraggablePlant
