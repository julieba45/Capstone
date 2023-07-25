import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CartPage from "./components/CartPage";
import GetAllPlants from "./components/GetAllPlants";
import PlantDetails from "./PlantDetails";
import PaymentForm from "./components/PaymentForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/plants">
            <GetAllPlants/>
          </Route>
          <Route path="/plants/:plantId">
            <PlantDetails/>
          </Route>
          <Route exact path="/cart/payment">
            <PaymentForm/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
