import React, { useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

interface QrModalProps {
  visible: boolean;
  onClose: () => void;
  reservaData: {
    id: string;
    pelicula: string;
    sala: string;
    fecha: string;
    hora: string;
    asientos: string;
    total: string | number;
  } | null;
}

const { width } = Dimensions.get("window");

export default function QrModal({ visible, onClose, reservaData }: QrModalProps) {
  const viewShotRef = useRef<any>(null);

  if (!reservaData) return null;

  const qrContent = JSON.stringify({
    id: reservaData.id,
    pelicula: reservaData.pelicula,
    sala: reservaData.sala,
    fecha: reservaData.fecha,
    hora: reservaData.hora,
    asientos: reservaData.asientos,
    total: reservaData.total,
  });

  const guardarImagenQR = async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();

        const isAvailable = await Sharing.isAvailableAsync();
        if (!isAvailable) {
          Alert.alert(
            "Error",
            "La función de compartir no está disponible en este dispositivo."
          );
          return;
        }

        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Guardar o compartir código QR",
          UTI: "public.png",
        });
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la imagen del QR.");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.cardModal}>
          {/* Título y Nombre de la Película completos */}
          <Text style={styles.modalTitle}>Boleto Digital</Text>
          <Text style={styles.modalSubtitle}>{reservaData.pelicula}</Text>

          {/* Área capturable para exportar el PNG */}
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 1.0 }}
            style={styles.qrContainer}
          >
            <QRCode
              value={qrContent}
              size={180}
              backgroundColor="#FFFFFF"
              color="#000000"
            />
            {/* Muestra el ID exacto justo debajo del QR */}
            <Text style={styles.qrFooterText}>#{reservaData.id}    </Text>
          </ViewShot>

          {/* Botones de Acción */}
          <TouchableOpacity style={styles.btnSave} onPress={guardarImagenQR}>
            <Text style={styles.btnSaveText}>Guardar / Compartir    </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnClose} onPress={onClose}>
            <Text style={styles.btnCloseText}>Cerrar  </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  cardModal: {
    width: width * 0.88, // Ancho adaptable a la pantalla del teléfono
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F8FAFC",
    textAlign: "center",
    width: "100%",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#38BDF8",
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 16,
    textAlign: "center",
    width: "100%",
  },
  qrContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  qrFooterText: {
    marginTop: 10,
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnSave: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  btnSaveText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnClose: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  btnCloseText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
});