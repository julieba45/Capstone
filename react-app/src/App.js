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
import CancelledOrders from "./components/CancelledOrders";
import { getCart } from "./store/cart";
import MyFavoritesPage from "./components/MyFavoritesPage";
import GardenDetailsPage from "./components/GardenDetailsPage";
import Home from "./components/Home";
import ProtectedRoute from "./ProtectedRoute";
import CarePage from "./components/CarePage";
import Footer from "./components/Footer.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getCart())
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation isLoaded={isLoaded} />
      <div className="main-content">
      {isLoaded && (
        <Switch>
          <Route exact path ='/'>
            <Home />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute exact path="/care">
            <CarePage/>
          </ProtectedRoute>
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
          <ProtectedRoute exact path='/orders/cancelled'>
            <CancelledOrders/>
          </ProtectedRoute>
          <ProtectedRoute exact path='/favorites'>
            <MyFavoritesPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/garden/:gardenName">
            <GardenDetailsPage/>
          </ProtectedRoute>
        </Switch>
      )}
      </div>
      {isLoaded && <Footer/>}
    </div>
  );
}

export default App;
