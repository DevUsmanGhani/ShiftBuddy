import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
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
// Create persisted reducer 
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Export the store
export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
  )
);
// Export the persistor
export const persistor = persistStore(store);




