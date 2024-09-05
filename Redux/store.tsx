import {
  configureStore,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./authSlice";

// Combine reducers
const combinedReducer = combineReducers({
  auth: authReducer,
});

// Define persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

// Wrap combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, combinedReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor for persistence
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
