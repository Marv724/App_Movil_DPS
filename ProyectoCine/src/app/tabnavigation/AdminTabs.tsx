import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PeliScreen from "../../screens/PeliculasScreen";
import ReservaScreen from "../../screens/ReservasScreen";
import SalaScreen from "../../screens/SalasScreen";
import DashBoardScreen from "../../screens/Dashboard";
import FuncionScreen from "../../screens/FuncionesScreen";

const Tab = createBottomTabNavigator();

function HeaderLogoutButton() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.logoutBtn}
      onPress={() => navigation.navigate("Cartelera")}
    >
      <Text style={styles.logoutBtnText}>🚪 Salir</Text>
    </TouchableOpacity>
  );
}

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0F17" },
        headerTintColor: "#F8FAFC",
        headerRight: () => <HeaderLogoutButton />,
        tabBarStyle: { backgroundColor: "#0B0F17", borderTopColor: "#1E293B" },
        tabBarActiveTintColor: "#38BDF8",
        tabBarInactiveTintColor: "#64748B",
      }}
    >
      <Tab.Screen name="Peliculas" component={PeliScreen} options={{ title: "Películas" }} />
      <Tab.Screen name="Salas" component={SalaScreen} options={{ title: "Salas" }} />
      <Tab.Screen name="Funciones" component={FuncionScreen} options={{ title: "Funciones" }} />
      <Tab.Screen name="Reservas" component={ReservaScreen} options={{ title: "Reservas" }} />
      <Tab.Screen name="Dashboard" component={DashBoardScreen} options={{ title: "Dashboard" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "rgba(239, 68, 68, 0.4)",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 16,
  },
  logoutBtnText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "bold",
  },
});