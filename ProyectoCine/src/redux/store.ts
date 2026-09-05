 import { configureStore, combineReducers } from "@reduxjs/toolkit";

import{
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";


import peliculasReducer from "../redux/slices/peliculaSlice";
import salasReducer from "../redux/slices/salasSlice";
import reservasReducer from "../redux/slices/reservasSlice";
import funcionesReducer from "../redux/slices/funcionesSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

const rootReducer = combineReducers({
    peliculas: peliculasReducer,
    salas: salasReducer,
    reservas: reservasReducer,
    funciones: funcionesReducer
});



const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER],
            },
        }),
});



export const persistor = persistStore(store);


// Tipos para Redux
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;