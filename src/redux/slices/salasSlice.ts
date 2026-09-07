import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sala } from "../../types/sala";

interface SalasState {
    salas: Sala[];
    salaSeleccionada: Sala | null;
    error:string;
}




//estado inicial
const initialState: SalasState = {
    salas: [], salaSeleccionada: null, error: ""
};

const salasSlice = createSlice({
    name: "salas",
    initialState,

        reducers: {
            addSala:(state, action:PayloadAction<Sala>)=>{
                const existe = state.salas.some(
                    s => s.id === action.payload.id &&
                    s.id !== state.salaSeleccionada?.id

                );
            
                if (existe) {
                            
                    console.log("La Sala Ya existe");
                    return;
                }
                state.salas.push(action.payload);
            },

            removeSala:(state, action: PayloadAction<string>) => {
            state.salas = state.salas.filter(
                sala => sala.id !== action.payload
            );

            },

            selectSala: (state, action: PayloadAction<Sala | null>) => {
                        state.salaSeleccionada = action.payload;
            },

            updateSala: (state, action: PayloadAction<Sala>) => {
            
                const indice = state.salas.findIndex(
                    sala => sala.id === action.payload.id
                );
            
                if (indice !== -1) {
                    state.salas[indice] = action.payload;
                }
            
            }

        }
});

export const {
    addSala,
    removeSala,
    selectSala,
    updateSala

} = salasSlice.actions;

export default salasSlice.reducer;
