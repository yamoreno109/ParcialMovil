import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BarraInferior from './components/BarraInferior';
import BarraMedio from './components/BarraMedio';
import BarraSuperior from './components/BarraSuperior';

export default function App() {
  return (
    <View style={styles.container}>
      <BarraSuperior />
      <View style={styles.middleContainer}>
        <BarraMedio />
      </View>
      <BarraInferior />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center', // Centra BarraMedio verticalmente
  },
});