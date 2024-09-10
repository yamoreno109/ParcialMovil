import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FavoritosScreen() {
    const [favorites, setFavorites] = useState([]);
    const navigation = useNavigation();

    const fetchFavorites = async () => {
        try {
            const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            console.log('Fetched favorites:', storedFavorites); // Agrega este log
            setFavorites(storedFavorites);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('AnimeData', item)}>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{item.canonicalTitle}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={item => item.canonicalTitle}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
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
});