import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PeliScreen from "../../screens/PeliculasScreen";
import ReservaScreen from "../../screens/ReservasScreen";
import SalaScreen from "../../screens/SalasScreen";
import DashBoardScreen from "../../screens/Dashboard";
import FuncionScreen from "../../screens/FuncionesScreen";

const Tab = createBottomTabNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Peliculas" component={PeliScreen} />
                <Tab.Screen name="Salas" component={SalaScreen} />
                <Tab.Screen name="Funciones" component={FuncionScreen} />
                <Tab.Screen name="Reservas" component={ReservaScreen} />
                <Tab.Screen name="Dashboard" component={DashBoardScreen} />
                <Tab.Screen name="Escaner" component={Escaner} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
