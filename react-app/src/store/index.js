import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import cartReducer from './cart';
import plantsReducer from './plant';
import reviewReducer from './review';
import paymentReducer from './payment';
import orderReducer from './order';

const rootReducer = combineReducers({
  session,
  cart: cartReducer,
  plants: plantsReducer,
  reviews: reviewReducer,
  payment: paymentReducer,
  orders:orderReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
