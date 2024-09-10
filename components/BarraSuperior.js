import { StyleSheet, Text, View, Dimensions, StatusBar, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function BarraInferior() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('Naruto');
  const navigation = useNavigation();

  const obtenerDatos = () => {
    const URL = `https://kitsu.io/api/edge/manga?filter[text]=${query}`;
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
      <TouchableOpacity onPress={() => navigation.navigate('MangaData',{
        uri: item.attributes.posterImage.original,
        canonicalTitle: item.attributes.canonicalTitle, 
        synopsis: item.attributes.synopsis,
        showType: item.attributes.showType,
        episodeCount: item.attributes.episodeCount,
        episodeLength: item.attributes.episodeLength,
        startDate: item.attributes.startDate,
        endDate: item.attributes.endDate,
        ageRating: item.attributes.ageRating,
        ageRatingGuide: item.attributes.ageRatingGuide,
        averageRating: item.attributes.averageRating,
        status: item.attributes.status,
        popularityRank: item.attributes.popularityRank
      }) }>
        <Image
          source={{ uri: item.attributes.posterImage.original }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{item.attributes.canonicalTitle}</Text>
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
    paddingBottom: 20,
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