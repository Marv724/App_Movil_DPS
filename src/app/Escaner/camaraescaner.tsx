import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CameraComponent = () => {
  // Cámara actualmente activa: 'back' (trasera) o 'front' (frontal).
  const [facing, setFacing] = useState<CameraType>('back');
  // Controla si el visor de cámara está abierto en pantalla o no.
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  // Estado y función para pedir el permiso de cámara al sistema operativo.
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Necesita permiso para ver la camara</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  // Alterna entre cámara trasera y frontal.
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // Muestra el visor de cámara.
  function handleOpenCamera() { setIsCameraVisible(true); }
  // Oculta el visor de cámara.
  function handleCloseCamera() { setIsCameraVisible(false); }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        // Visor de cámara en vivo, con controles superpuestos.
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCloseCamera}>
              <Text style={styles.text}>Close Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        // Estado inicial: botón para abrir la cámara.
        <Button title="Open Camera" onPress={handleOpenCamera} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  // El visor de cámara ocupa todo el espacio disponible.
  camera: { flex: 1 },
  // Fila de botones superpuesta en la parte inferior del visor.
  buttonContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 64 },
  heading: { fontSize: 24, marginBottom: 20 },
  button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});