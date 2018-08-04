import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Export the store
export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);
// Export the persistor
export const persistor = persistStore(store);




