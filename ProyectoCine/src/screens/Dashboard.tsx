import { ScrollView, Text, StyleSheet } from "react-native";
import Dashboard from "../app/dashboard/Dashboard";

export default function DashBoardScreen() {
    return(
        <ScrollView contentContainerStyle={styles.contenedor}>
            <Text style={styles.titulo}>Dashboard</Text>
            <Dashboard />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {padding:16},
    titulo: {fontSize: 20, fontWeight: "bold", marginBottom: 12}
})