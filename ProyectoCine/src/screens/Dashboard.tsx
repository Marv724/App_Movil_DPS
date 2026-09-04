import { View, Text, StyleSheet } from "react-native";
import Dashboard from "../app/dashboard/Dashboard";

export default function DashBoardScreen() {
    return(
        <View>
            <Text>Text</Text>
            <Dashboard/>
        </View>

    );
}

const styles = StyleSheet.create({
    contenedor: {padding:16},
    titulo: {fontSize: 20, fontWeight: "bold", marginBottom: 12}
})