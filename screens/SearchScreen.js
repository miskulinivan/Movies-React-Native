import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Image,
    StatusBar,
    Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import useDimensions from '../hooks/useDimensions';
import GradientBackground from '../components/GradientBackground';
import { allData } from '../data/data';
import { colors } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function SearchScreen() {
    const { width, height } = useDimensions();
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();
    const handleSearch = () => {
        const lowercaseSearchInput = searchInput.toLowerCase();
        if (searchInput.trim() === '') {
            setFilteredData([]);
        } else {
            const filteredItems = allData.filter((item) =>
                item.title.toLowerCase().includes(lowercaseSearchInput)
            );
            setFilteredData(filteredItems);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name='keyboard-backspace'
                    size={30}
                    color='white'
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search movie, series...'
                    style={styles.inputStyle}
                    placeholderTextColor={colors.textSecondary}
                    value={searchInput}
                    onChangeText={(text) => setSearchInput(text)}
                    onSubmitEditing={() => handleSearch()}
                />

                <GradientBackground
                    useGradient={true}
                    linearGradientStyle={styles.search}
                    focused={true}
                >
                    <Pressable onPress={() => handleSearch()}>
                        <FontAwesome name='search' size={25} color='white' />
                    </Pressable>
                </GradientBackground>
            </View>

            <ScrollView
                style={styles.resultsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <Text style={styles.resultsText}>Results: {filteredData.length}</Text>
                <View style={styles.moviesContainer}>
                    {filteredData.length > 0 ? (
                        filteredData?.map((item, index) => (
                            <Pressable key={index}>
                                <View>
                                    <Image
                                        source={require('../assets/maleficent.jpg')}
                                        style={[
                                            styles.movieImage,
                                            {
                                                width: width * 0.4,
                                                height: height * 0.3,
                                            },
                                        ]}
                                    />
                                    <Text style={styles.movieTitle}>
                                        {item.title?.length > 22
                                            ? item.title?.slice(0, 22) + '...'
                                            : item.title}
                                    </Text>
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <View style={styles.noResults}>
                            <Image
                                source={require('../assets/noResults.png')}
                                style={{
                                    width,
                                    height: height * 0.5,
                                }}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
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
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    inputStyle: {
        backgroundColor: colors.searchBackground,
        padding: 10,
        borderRadius: 15,
        flex: 1,
        marginRight: 20,
        color: colors.textSecondary,
    },
    search: {
        borderRadius: 15,
        padding: 10,
    },
    scrollContainer: {
        paddingHorizontal: 15,
    },
    resultsText: {
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 16,
    },
    moviesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },

    movieImage: {
        borderRadius: 12,
    },
    movieTitle: {
        color: colors.textSecondary,
    },
    noResultsText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
    },
    noResults: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
