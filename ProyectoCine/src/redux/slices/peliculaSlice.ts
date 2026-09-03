import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pelicula } from '../../types/pelicula';


interface PeliculasState {
    peliculas: Pelicula[];
    peliculaSeleccionada: Pelicula | null;
}


//estado inicial
const initialState: PeliculasState = {
    peliculas: [], peliculaSeleccionada: null
};



//CREATE, con este metodo creamos el slice de peliculas, que es un objeto que contiene el estado inicial y los reducers 
const peliculasSlice = createSlice({
    name: "peliculas",
    initialState,
    
    
    reducers: {
        addPelicula:(state, action:PayloadAction<Pelicula>)=>{

            

            const existe = state.peliculas.some(
                p => p.codigo === action.payload.codigo &&
                p.codigo !== state.peliculaSeleccionada?.codigo
            );

            if (existe) {
                
                console.log("La pelicula Ya existe");
                return;
            }
            state.peliculas.push(action.payload);
        },

        removePelicula: (state, action: PayloadAction<string>) => {
            state.peliculas = state.peliculas.filter(
                pelicula => pelicula.codigo !== action.payload
            );
        },

        selectPelicula: (state, action: PayloadAction<Pelicula | null>) => {
            state.peliculaSeleccionada = action.payload;
        },

        updatePelicula: (state, action: PayloadAction<Pelicula>) => {

            const indice = state.peliculas.findIndex(
                pelicula => pelicula.codigo === action.payload.codigo
            );

            if (indice !== -1) {
                state.peliculas[indice] = action.payload;
            }

        }
    }


});


export const {
    addPelicula,
    removePelicula,
    selectPelicula,
    updatePelicula
} = peliculasSlice.actions;

export default peliculasSlice.reducer;
