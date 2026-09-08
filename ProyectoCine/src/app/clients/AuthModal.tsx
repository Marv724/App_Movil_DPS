import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PASSWORD_CORRECTO = "FFJJKK8800";

export default function AuthModal({ visible, onClose, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"escrita" | "biometrica">("escrita");

  useEffect(() => {
    if (visible) {
      setPassword("");
      setAuthMode("escrita");
    }
  }, [visible]);

  const ejecutarBiometria = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!compatible || !enrolled) {
        Alert.alert(
          "Biometría no disponible",
          "Este dispositivo no tiene datos biométricos configurados o no es compatible."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Escaneando datos biométricos...",
        fallbackLabel: "Usar contraseña escrita",
        cancelLabel: "Cancelar",
      });

      if (result.success) {
        onSuccess();
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el reconocimiento biométrico.");
    }
  };

  const toggleAuthMode = () => {
    if (authMode === "escrita") {
      setAuthMode("biometrica");
      ejecutarBiometria();
    } else {
      setAuthMode("escrita");
    }
  };

  const validarPasswordEscrito = () => {
    if (password === PASSWORD_CORRECTO) {
      onSuccess();
    } else {
      Alert.alert("Acceso denegado", "La contraseña ingresada es incorrecta.");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Acceso Empleados</Text>
          <Text style={styles.subtitle}>
            {authMode === "escrita"
              ? "Ingresa la contraseña registrada."
              : "Autenticando mediante datos biométricos (FaceID/Huella)..."}
          </Text>

          {authMode === "escrita" ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#64748B"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.btnPrimary} onPress={validarPasswordEscrito}>
                <Text style={styles.btnPrimaryText} numberOfLines={1} adjustsFontSizeToFit>
                  Ingresar
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.bioBox}>
              <Text style={styles.bioIcon}>👤</Text>
              <TouchableOpacity style={styles.btnPrimary} onPress={ejecutarBiometria}>
                <Text style={styles.btnPrimaryText} numberOfLines={1} adjustsFontSizeToFit>
                  Reintentar Escaneo
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.btnToggle} onPress={toggleAuthMode}>
            <Text style={styles.btnToggleText} numberOfLines={1} adjustsFontSizeToFit>
              {authMode === "escrita" ? "Usar Biometría" : "Usar Contraseña Escrita"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
            <Text style={styles.btnCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  title: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1E293B",
    color: "#F8FAFC",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  btnPrimary: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  btnPrimaryText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 14,
  },
  bioBox: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  bioIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  btnToggle: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 4,
    marginBottom: 8,
  },
  btnToggleText: {
    color: "#38BDF8",
    fontWeight: "600",
    fontSize: 13,
  },
  btnCancel: {
    paddingVertical: 8,
    alignItems: "center",
  },
  btnCancelText: {
    color: "#94A3B8",
    fontSize: 13,
  },
});