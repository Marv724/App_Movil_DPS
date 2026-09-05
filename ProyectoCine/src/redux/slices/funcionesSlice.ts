import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Funcion } from '../../types/funcion';


interface FuncionesState {

    funciones: Funcion[];

    funcionSeleccionada: Funcion | null;

}



const initialState: FuncionesState = {

    funciones: [],

    funcionSeleccionada: null

};



const funcionesSlice = createSlice({

    name: "funciones",

    initialState,

    reducers: {


        addFuncion: (
            state,
            action: PayloadAction<Funcion>
        ) => {

            const existe = state.funciones.some(
                funcion =>
                    funcion.id === action.payload.id
            );


            if (existe) {

                console.log("La función ya existe");

                return;

            }


            state.funciones.push(action.payload);

        },


        removeFuncion: (
            state,
            action: PayloadAction<string>
        ) => {

            state.funciones =
                state.funciones.filter(
                    funcion =>
                        funcion.id !== action.payload
                );

        },


        selectFuncion: (
            state,
            action: PayloadAction<Funcion | null>
        ) => {

            state.funcionSeleccionada =
                action.payload;

        },


        updateFuncion: (
            state,
            action: PayloadAction<Funcion>
        ) => {

            const indice =
                state.funciones.findIndex(
                    funcion =>
                        funcion.id === action.payload.id
                );


            if (indice !== -1) {

                state.funciones[indice] =
                    action.payload;

            }

        }


    }

});



export const {

    addFuncion,

    removeFuncion,

    selectFuncion,

    updateFuncion

} = funcionesSlice.actions;



export default funcionesSlice.reducer;