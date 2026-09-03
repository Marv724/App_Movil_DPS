import * as  React from "react";
import {StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function Menuprincipal(){
    return(
    <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
        <Text>Casa pantalla</Text>
    </View>
    );
}

function Menusecundario(){
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
            <Text>Menu secundario</Text>
        </View>
    )
}

export default function App(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Menuprincipal} />
                <Tab.Screen name="secundario" component={Menusecundario} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}