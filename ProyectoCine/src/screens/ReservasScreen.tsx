import { ScrollView, Text, StyleSheet } from "react-native";
import FormularioReserva from "../app/reservas/FormularioReserva"
import TablaReservas from "../app/reservas/TablaReservas"

export default function ReservaScreen() {
    return <TablaReservas ListHeaderComponent={<FormularioReserva />} />
}
