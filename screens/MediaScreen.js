import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import useDimensions from '../hooks/useDimensions';
import MediaDisplay from '../components/MediaDisplay';

import { colors } from '../theme';
import { categories, allData } from '../data/data';
import { Pressable } from 'react-native';
import { fetchImage, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies } from '../api';
import Loading from '../components/Loading';

const personPlaceHolder =
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtNTg2YmF0Y2gyLWVtb2ppLTAwM18xLmpwZw.jpg';
export default function MediaScreen() {
    const { params: media } = useRoute();
    const { width, height } = useDimensions();
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [cast, setCast] = useState([]);
    const [recommended, setRecommended] = useState([1, 2, 3, 4]);
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        setLoading(true);
        getMovieDetails(media.id);
        getMovieCast(media.id);
        getSimilarMovies(media.id);
    }, [media]);

    const getMovieCast = async (movieID) => {
        try {
            const movieCredits = await fetchMovieCredits(movieID);
            setLoading(false);
            if (movieCredits) {
                setCast(movieCredits.cast);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const getMovieDetails = async (movieID) => {
        try {
            const movieDetails = await fetchMovieDetails(movieID);
            setLoading(false);
            if (movieDetails) {
                setMovie({ ...movie, ...movieDetails });
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const getSimilarMovies = async (movieID) => {
        try {
            const similar = await fetchSimilarMovies(movieID);
            setLoading(false);
            if (similarMovies) {
                setSimilarMovies(similar.results);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <ScrollView style={styles.screenContainer}>
            <View>
                <ImageBackground
                    source={{
                        uri: fetchImage(movie.backdrop_path),
                    }}
                    style={{
                        width,
                        height: height * 0.6,
                    }}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.header}>
                            <Ionicons
                                name='md-arrow-back-circle'
                                size={30}
                                color='white'
                                onPress={() => navigation.goBack()}
                            />
                            <AntDesign
                                name='heart'
                                size={30}
                                color={isFavourite ? 'white' : 'red'}
                                onPress={() => setIsFavourite(!isFavourite)}
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.trailerContainer}>
                                <AntDesign name='play' size={25} color='white' />
                                <Text style={styles.trailerText}>Watch Trailer</Text>
                            </View>
                            <Text style={styles.title}>{movie?.title}</Text>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detailText}>{movie?.original_language}</Text>
                                {movie.genres?.map((genre, index) => (
                                    <Text key={index} style={styles.detailText}>
                                        {genre.name}
                                    </Text>
                                ))}
                                <Text style={[styles.detailText, { borderRightWidth: 0 }]}>
                                    {movie.runtime}min
                                </Text>
                            </View>

                            <View style={styles.bottomBorder}></View>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.storyContainer}>
                <Text style={styles.storyTitle}>Story Line</Text>
                <Text style={styles.storyText}>{movie.overview}</Text>
            </View>
            <View style={styles.castContainer}>
                <Text style={styles.castTitle}>Star Cast</Text>
                {cast.length > 0 && (
                    <ScrollView horizontal>
                        {cast.map((person, index) => (
                            <Pressable
                                style={styles.castItem}
                                key={index}
                                onPress={() => navigation.navigate('CastMember')}
                            >
                                <Image
                                    /*   source={{
                                        uri: fetchImage(person?.profile_path) || personPlaceHolder,
                                    }}
 */
                                    source={{
                                        uri: fetchImage(person?.profile_path) || personPlaceHolder,
                                    }}
                                    style={[
                                        styles.castImage,
                                        {
                                            width: width * 0.15,
                                            height: height * 0.08,
                                        },
                                    ]}
                                />
                                <View style={styles.castInfo}>
                                    <Text style={styles.castRole}>
                                        {person.known_for_department}
                                    </Text>
                                    <Text style={styles.castName}>{person?.name}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </View>
            <MediaDisplay data={similarMovies} title='Recommended' />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 7,
    },
    detailsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        marginBottom: 7,
    },
    detailText: {
        color: colors.textSecondary,
        fontWeight: 'bold',
        borderRightWidth: 2,
        borderRightColor: colors.textSecondary,
        paddingHorizontal: 10,
    },
    noBorderRight: {
        borderRightWidth: 0,
    },
    bottomBorder: {
        height: 1,
        backgroundColor: colors.textSecondary,
        width: '70%',
        alignSelf: 'center',
        marginTop: 10,
        position: 'absolute',
        bottom: 0,
    },
    storyContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    storyTitle: {
        color: 'white',
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize: 20,
    },
    storyText: {
        color: colors.textSecondary,
        letterSpacing: 0.35,
    },
    castContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    castTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    castItem: {
        flexDirection: 'row',
        marginRight: 15,
    },
    castImage: {
        borderRadius: 100,
    },
    castInfo: {
        marginLeft: 10,

        width: 100,
        height: 100,
    },
    castRole: {
        color: colors.textSecondary,
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    castName: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    trailerContainer: {
        position: 'absolute',
        right: 0,
        bottom: 100,
        flexDirection: 'row',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        padding: 10,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
    },
    trailerText: {
        color: '#cd4b32',
        fontWeight: 'bold',
        paddingRight: 10,
        marginLeft: 5,
    },
});
