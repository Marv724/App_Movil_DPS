import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reserva } from "../../types/reserva";


interface ReservasState {

    reservas: Reserva[];

    reservaSeleccionada: Reserva | null;

}



const initialState: ReservasState = {

    reservas: [],

    reservaSeleccionada: null

};



const reservasSlice = createSlice({

    name:"reservas",

    initialState,

    reducers:{


        addReserva:(state, action:PayloadAction<Reserva>)=>{

            state.reservas.push(action.payload);

        },


        removeReserva:(state, action:PayloadAction<string>)=>{

            state.reservas =
                state.reservas.filter(
                    reserva => reserva.id !== action.payload
                );

        },


        selectReserva:(state, action:PayloadAction<Reserva|null>)=>{

            state.reservaSeleccionada = action.payload;

        },


        updateReserva:(state, action:PayloadAction<Reserva>)=>{

            const indice =
                state.reservas.findIndex(
                    reserva => reserva.id === action.payload.id
                );


            if(indice !== -1){

                state.reservas[indice] = action.payload;

            }

        }


    }

});


export const {
    addReserva,
    removeReserva,
    selectReserva,
    updateReserva

}=reservasSlice.actions;



export default reservasSlice.reducer;