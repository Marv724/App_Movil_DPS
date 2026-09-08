import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
// Importa ClienteLayout (que incluye Cartelera + Mis Reservas)
import ClienteLayout from "../screens/clienteLayout";
import AdminTabs from "../app/tabnavigation/AdminTabs";
import AuthModal from "../app/clients/AuthModal";

export type RootStackParamList = {
  Cartelera: undefined;
  AdminPanel: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [modalVisible, setModalVisible] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<any>(null);

  const handleOpenAuth = (navigation: any) => {
    setNavigationTarget(navigation);
    setModalVisible(true);
  };

  const handleAuthSuccess = () => {
    setModalVisible(false);
    if (navigationTarget) {
      navigationTarget.navigate("AdminPanel");
    }
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0B0F17" },
          headerTintColor: "#F8FAFC",
          contentStyle: { backgroundColor: "#0B0F17" },
        }}
      >
        <Stack.Screen
          name="Cartelera"
          component={ClienteLayout} // <-- Cambiado de CarteleraClienteScreen a ClienteLayout
          options={({ navigation }) => ({
            title: "🎬 Cine App",
            headerRight: () => (
              <TouchableOpacity
                style={styles.adminBtn}
                onPress={() => handleOpenAuth(navigation)}
              >
                <Text style={styles.adminBtnText}>Empleados</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <AuthModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}

const styles = StyleSheet.create({
  adminBtn: {
    backgroundColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "rgba(56, 189, 248, 0.4)",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  adminBtnText: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "bold",
  },
});