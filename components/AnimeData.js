import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function AnimeData() {
    const route = useRoute();
    const {
        uri, canonicalTitle, synopsis, showType, episodeCount, episodeLength,
        startDate, endDate, ageRating, ageRatingGuide, averageRating, status, popularityRank
    } = route.params;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
                const isFav = favorites.some(fav => fav.canonicalTitle === canonicalTitle);
                setIsFavorite(isFav);
            } catch (error) {
                console.error(error);
            }
        };
        checkFavorite();
    }, [canonicalTitle]);

    const toggleFavorite = async () => {
        try {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            if (isFavorite) {
                const updatedFavorites = favorites.filter(fav => fav.canonicalTitle !== canonicalTitle);
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                console.log('Removed from favorites:', updatedFavorites); // Agrega este log
                setIsFavorite(false);
            } else {
                const newFavorite = { uri, canonicalTitle, synopsis, showType, episodeCount, episodeLength, startDate, endDate, ageRating, ageRatingGuide, averageRating, status, popularityRank };
                favorites.push(newFavorite);
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
                console.log('Added to favorites:', favorites); // Agrega este log
                setIsFavorite(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
                <Text style={styles.title}>{canonicalTitle}</Text>
                <Text style={styles.description}>{synopsis}</Text>
                <Text style={styles.text}>Tipo: {showType}</Text>
                <Text style={styles.text}>Episodios: {episodeCount || 'N/A'}</Text>
                <Text style={styles.text}>Duración: {episodeLength ? `${episodeLength} min` : 'N/A'}</Text>
                <Text style={styles.text}>Inicio: {startDate}</Text>
                <Text style={styles.text}>Final: {endDate || 'En emisión'}</Text>
                <Text style={styles.text}>Clasificación: {ageRating}</Text>
                <Text style={styles.text}>Guía de clasificación: {ageRatingGuide}</Text>
                <Text style={styles.text}>Puntuación: {averageRating}</Text>
                <Text style={styles.text}>Estado: {status}</Text>
                <Text style={styles.text}>Popularidad: #{popularityRank}</Text>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={toggleFavorite}
                >
                    <Text style={styles.favoriteButtonText}>
                        {isFavorite ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 40,
    },
    image: {
        width: width - 40,
        height: 500,
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'justify',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 5,
    },
    favoriteButton: {
        backgroundColor: '#ee8121',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});