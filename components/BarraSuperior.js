import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default function BarraSuperior() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AnimePulse</Text>
      <Image
        source={require('../assets/pngwing.com.png')} 
        style={styles.image}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: width,
    backgroundColor: '#000000',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});