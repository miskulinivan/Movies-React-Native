import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { Shadow } from 'react-native-shadow-2';
import useDimensions from '../hooks/useDimensions';
import MediaDisplay from '../components/MediaDisplay';
import { allData } from '../data/data';

export default function CastMemberScreen() {
    const { width, height } = useDimensions();
    const navigation = useNavigation();
    const [castMovies, setCastMovies] = useState(allData);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name='keyboard-backspace'
                    size={30}
                    color='white'
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.imageContainer}>
                <Shadow
                    distance={20}
                    startColor={colors.backgroundPrimary}
                    endColor={colors.grayPrimary}
                >
                    <ImageBackground
                        source={require('../assets/maleficent.jpg')}
                        style={[styles.image, { height: height * 0.5, width: width * 0.75 }]}
                    >
                        <View style={styles.imageContent}>
                            <View style={styles.imageTextContainer}>
                                <Text style={styles.imageTitle}>Angelina Jolie</Text>
                                <Text style={styles.imageSubtitle}>
                                    Los Angeles, California, USA
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </Shadow>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Gender</Text>
                    <Text style={styles.infoValue}>Female</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Birthday</Text>
                    <Text style={styles.infoValue}>1920-03-14</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Known for</Text>
                    <Text style={styles.infoValue}>Acting</Text>
                </View>
                <View style={[styles.infoItem, { borderRightWidth: 0 }]}>
                    <Text style={styles.infoLabel}>Popularity</Text>
                    <Text style={styles.infoValue}>60.23</Text>
                </View>
            </View>
            <View style={styles.biographyContainer}>
                <Text style={styles.biographyTitle}>Biography</Text>
                <Text style={styles.biographyText}>
                    Angelina Jolie is an Academy Award-winning actress who rose to fame after her
                    role in Girl, Interrupted (1999), playing the title role in the "Lara Croft"
                    blockbuster movies, as well as Mr. & Mrs. Smith (2005), Wanted (2008), Salt
                    (2010) and Maleficent (2014). Off-screen, Jolie has become prominently involved
                    in international charity projects, especially those involving refugees. She
                    often appears on many "most beautiful women" lists, and she has a personal life
                    that is avidly covered by the tabloid press.
                </Text>
            </View>
            <MediaDisplay title='Known for' data={castMovies} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    header: {
        paddingHorizontal: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        borderColor: colors.grayPrimary,
    },
    imageContent: {
        flexDirection: 'column-reverse',
        flex: 1,
        alignItems: 'center',
    },
    imageTextContainer: {
        alignItems: 'center',
    },
    imageTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    imageSubtitle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: colors.textSecondary,
    },
    infoContainer: {
        backgroundColor: colors.graySecondary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        borderRadius: 20,
        padding: 12,
        marginTop: 40,
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'column',
        paddingHorizontal: 2,
        borderRightWidth: 2,
        borderRightColor: 'white',
        paddingHorizontal: 6,
        alignItems: 'center',
    },
    infoLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoValue: {
        color: 'white',
        fontSize: 12,
        alignItems: 'center',
    },
    biographyContainer: {
        paddingHorizontal: 16,
    },
    biographyTitle: {
        color: 'white',
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize: 20,
    },
    biographyText: {
        color: colors.textSecondary,
        letterSpacing: 0.35,
    },
});
