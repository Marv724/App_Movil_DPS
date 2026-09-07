import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

export const CameraComponent = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scaneo, setescaneo] = useState(false); 

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Necesita permiso para ver la camara</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleOpenCamera() { setIsCameraVisible(true); }
  function handleCloseCamera() { setIsCameraVisible(false); }

  function handleBarcodeScanned({data}: BarcodeScanningResult){
    if(scaneo) return;
    setescaneo(true);
    console.log("QR ha sido leido", data);

    Alert.alert(
      "QR escaneado....",
      data,[
        {
          text: "Escanear otro QR",
          onPress: () => setescaneo(false),
        },
        {
          text: "Cerrar",
          onPress: () => handleCloseCamera()
        }
      ]
    )
  }
  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={scaneo ? undefined: handleBarcodeScanned}
        >
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
        <Button title="Open Camera" onPress={handleOpenCamera} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 64 },
  heading: { fontSize: 24, marginBottom: 20 },
  button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});