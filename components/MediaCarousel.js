import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import useDimensions from '../hooks/useDimensions';
import Person from '../assets/person.jpg';

export default function MediaCarousel({ useCarousel }) {
    const { screenWidth } = useDimensions();
    const carouselRef = useRef(null);

    const carouselData = [
        { id: 1, title: 'Item 1', imageUri: Person },
        { id: 2, title: 'Item 2', imageUri: Person },
        { id: 3, title: 'Item 3', imageUri: Person },
        // Add more data items as needed
    ];

    const renderItem = ({ item }) => (
        <View style={{ borderRadius: 15 }}>
            <Image
                source={item.imageUri}
                style={{ width: screenWidth * 0.9, height: 200, borderRadius: 50 }}
            />
            <Text style={styles.carouselHeader}>{item.title}</Text>
        </View>
    );

    if (useCarousel) {
        return (
            <View
                style={{
                    paddingHorizontal: 16,
                }}
            >
                <View>
                    <Text style={styles.mediaHeader}>Trending</Text>
                </View>
                <View style={styles.carousel}>
                    <Carousel
                        loop
                        autoplay
                        ref={carouselRef} // Use useRef to create and assign a ref
                        data={carouselData}
                        renderItem={renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={screenWidth}
                    />
                </View>
            </View>
        );
    }

    return (
        <View>
            <ScrollView></ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    mediaHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingVertical: 8, // Vertical padding
        marginBottom: 16, // Spacing at the bottom
    },
    carouselHeader: {
        position: 'absolute',
    },
    carousel: {
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 14,
        elevation: 14,
    },
});
