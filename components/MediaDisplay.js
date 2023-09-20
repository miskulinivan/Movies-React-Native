import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import useDimensions from '../hooks/useDimensions';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchImage } from '../api';

const { width, height } = useDimensions();

export default function MediaDisplay({ useCarousel, data, title }) {
    const carouselRef = useRef(null);
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <Pressable key={item.id} onPress={() => navigation.navigate('Media', item)}>
            <View style={styles.carouselItem}>
                <Image
                    source={{ uri: fetchImage(item?.backdrop_path) }}
                    style={[
                        styles.image,
                        {
                            width: width * 0.9,
                            height: 200,
                        },
                    ]}
                />

                <View style={styles.infoContainer}>
                    <View style={styles.carouselTextContainer}>
                        <Text style={styles.titleText}>
                            {item.title?.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                        </Text>

                        <View style={styles.ratingContainer}>
                            <AntDesign
                                name='star'
                                size={20}
                                color='#f5c518'
                                style={styles.starIcon}
                            />
                            <Text style={styles.ratingText}> {item.vote_average.toFixed(1)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    if (useCarousel) {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.mediaHeader}>{title}</Text>
                </View>

                <Carousel
                    loop
                    autoplay
                    ref={carouselRef}
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.mediaHeader}>{title}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.pressable}
                        onPress={() => navigation.navigate('Media', item)}
                    >
                        <Image
                            source={{ uri: fetchImage(item.poster_path) }}
                            style={styles.pressableImage}
                        />
                        <View style={styles.pressableInfoContainer}>
                            <View style={{ flex: 1 }}>
                                <View>
                                    <View>
                                        <Text style={styles.pressableInfoText}>{item.title}</Text>
                                    </View>
                                    <View style={styles.pressableRatingContainer}>
                                        <View style={styles.pressableRating}>
                                            <AntDesign
                                                name='star'
                                                size={15}
                                                color='#f5c518'
                                                style={styles.starIcon}
                                            />
                                            <Text style={styles.pressableRatingText}>
                                                {item.vote_average}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    mediaHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 8,
        marginBottom: 16,
    },

    carouselItem: {
        borderRadius: 15,
    },
    image: {
        borderRadius: 50,
    },
    infoContainer: {
        position: 'absolute',
        bottom: 10,
    },
    carouselTextContainer: {
        left: 20,
        overflow: 'hidden',
    },
    titleText: {
        fontSize: 30,
        color: 'white',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 5,
    },
    ratingText: {
        color: 'white',
        fontWeight: 'bold',
    },
    carouselInfo: {
        position: 'absolute',
        right: -200,
    },
    playIcon: {
        fontSize: 40,
        color: 'white',
    },
    pressable: {
        marginRight: 20,
    },
    pressableImage: {
        width: width * 0.4,
        height: width * 0.5,
        borderRadius: 20,
    },
    pressableInfoContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    pressableInfoText: {
        flex: 1,
        color: 'white',
    },
    pressableRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pressableRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressableRatingText: {
        color: 'white',
        fontSize: 10,
    },
    pressablePlayIcon: {
        position: 'absolute',
        right: 30,
        bottom: 35,
    },
});
