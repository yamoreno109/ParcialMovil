import { StyleSheet, Text, View, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function BarraMedio() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('Naruto');


  const obtenerDatos = () => {
    const URL = `https://kitsu.io/api/edge/anime?filter[text]=${query}`;
    fetch(URL)
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData.data);
      })
      .catch(err => console.log(err));
  };


  useEffect(() => {
    obtenerDatos();
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.attributes.posterImage.original }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.attributes.canonicalTitle}</Text>
      <Text style={styles.description}>{item.attributes.synopsis}</Text>
      <Text style={styles.text}>Tipo: {item.attributes.showType}</Text>
      <Text style={styles.text}>Episodios: {item.attributes.episodeCount || 'N/A'}</Text>
      <Text style={styles.text}>Duración: {item.attributes.episodeLength ? `${item.attributes.episodeLength} min` : 'N/A'}</Text>
      <Text style={styles.text}>Inicio: {item.attributes.startDate}</Text>
      <Text style={styles.text}>Final: {item.attributes.endDate || 'En emisión'}</Text>
      <Text style={styles.text}>Clasificación: {item.attributes.ageRating}</Text>
      <Text style={styles.text}>Guía de clasificación: {item.attributes.ageRatingGuide}</Text>
      <Text style={styles.text}>Puntuación: {item.attributes.averageRating}</Text>
      <Text style={styles.text}>Estado: {item.attributes.status}</Text>
      <Text style={styles.text}>Popularidad: #{item.attributes.popularityRank}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar anime"
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={styles.button} onPress={obtenerDatos}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#444',
  },
  button: {
    backgroundColor: '#ee8121',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  flatListContainer: {
    paddingBottom: 20, // Espacio adicional al final de la lista
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: width - 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
});