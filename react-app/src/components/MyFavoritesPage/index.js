import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from "../../store/favorite";
import { NavLink } from 'react-router-dom';
import DraggablePlant from "../DraggablePlant";
import DroppableGarden from "../DroppableGarden";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MyFavoritesPage = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)

    useEffect(() => {
        console.log('HEYYYY------', favorites)
        dispatch(fetchFavorites())
    }, [dispatch])

    return (
        <DndProvider backend={HTML5Backend}>
          <h1>Favorites</h1>
          {favorites.map((favorite) => (
            <div key={favorite.id}>
              <DraggablePlant plant={favorite.plant} favorite={favorite} />
              <DroppableGarden gardenName={favorite.gardenName} dispatch={dispatch} />
            </div>
          ))}
        </DndProvider>
      );
};


// return (
//     <div>
//         <h1>Favorites</h1>
//         {favorites.map((favorite) => (
//             <div key={favorite.id}>
//                 <h2>
//                     Garden Name: <NavLink to={`/garden/${favorite.gardenName}`}>{favorite.gardenName}</NavLink>
//                 </h2>
//                 <p>Plant Name:{favorite.plant.name}</p>
//                 {/* <img src={favorite.plant.primary_image} alt="Plant" /> */}
//                 {/* <p>Created at: {new Date(favorite.createdAt).toLocaleString()}</p>
//                 <p>Updated at: {new Date(favorite.updatedAt).toLocaleString()}</p> */}
//             </div>
//         ))}
//     </div>
// )

export default MyFavoritesPage
