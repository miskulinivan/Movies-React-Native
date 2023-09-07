import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import useDimensions from '../hooks/useDimensions';

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = useDimensions();

export default function MediaDisplay({ useCarousel, data, title }) {
    const carouselRef = useRef(null);
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <Pressable>
            <View style={styles.carouselItem}>
                <Image source={item.imageUri} style={styles.image} />

                <View style={styles.infoContainer}>
                    <View style={styles.carouselTextContainer}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <View style={styles.ratingContainer}>
                            <AntDesign
                                name='star'
                                size={20}
                                color='#f5c518'
                                style={styles.starIcon}
                            />
                            <Text style={styles.ratingText}>4.5</Text>
                        </View>
                    </View>
                    <View style={styles.carouselInfo}>
                        <AntDesign name='play' size={40} color='white' />
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
                {data.map((item, index) => (
                    <Pressable
                        key={index}
                        style={styles.pressable}
                        onPress={() => navigation.navigate('Media')}
                    >
                        <Image source={item.imageUri} style={styles.pressableImage} />
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
                                            <Text style={styles.pressableRatingText}>4.5</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.pressableRatingText}>
                                                50M+Views
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.pressablePlayIcon}>
                                <AntDesign name='play' size={25} color='white' />
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
        width: width * 0.9,
        height: 200,
        borderRadius: 50,
    },
    infoContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    carouselTextContainer: {
        left: 20,
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
        width: width * 0.45,
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
