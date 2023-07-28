import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CartPage from "./components/CartPage";
import GetAllPlants from "./components/GetAllPlants";
import PlantDetails from "./components/PlantDetails";
import PaymentForm from "./components/PaymentForm";
import ConfirmationPage from "./components/ConfirmationPage";
import CurrentUserOrders from "./components/CurrentUserOrders";
import { getCart } from "./store/cart";
import MyFavoritesPage from "./components/MyFavoritesPage";
import GardenDetailsPage from "./components/GardenDetailsPage";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getCart())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path ='/'>
            <HomePage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/plants">
            <GetAllPlants/>
          </Route>
          <Route exact path="/plants/:plantId">
            <PlantDetails/>
          </Route>
          <ProtectedRoute exact path="/cart/payment">
            <PaymentForm/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/confirmation/:orderId'>
            <ConfirmationPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/orders/current'>
            <CurrentUserOrders/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/favorites'>
            <MyFavoritesPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/garden/:gardenName">
            <GardenDetailsPage/>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
