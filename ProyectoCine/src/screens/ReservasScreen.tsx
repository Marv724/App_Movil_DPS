import { ScrollView, Text, StyleSheet } from "react-native";
import FormularioReserva from "../app/reservas/FormularioReserva"
import TablaReservas from "../app/reservas/TablaReservas"

export default function reservaScreen() {
    return(
        <ScrollView contentContainerStyle={styles.contenedor}>
            <Text style={styles.titulo}>Reserva</Text>
            <FormularioReserva />
            <TablaReservas />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {padding: 16},
    titulo: {fontSize: 20, fontWeight: "bold", marginBottom: 12}
})