import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

export default function BarraInferior() {
  return (
    <View style={styles.containerInferior}>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ee8121' }]} onPress={() => alert('Inicio presionado')}>
        <Text style={styles.buttonText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ee8121' }]} onPress={() => alert('Libreria presionado')}>
        <Text style={styles.buttonText}>Libreria</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ee8121' }]} onPress={() => alert('Vistos presionado')}>
        <Text style={styles.buttonText}>Vistos</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerInferior: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});