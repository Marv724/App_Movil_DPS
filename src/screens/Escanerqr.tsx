import React from "react"
import Escaner_Layout from "../app/Escaner/escaner";
import { View, StyleSheet } from "react-native";



export default function Escaner() {
    return(
        <View style ={styles.contenedor}>
            <Escaner_Layout />
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{ flex: 1}
})