import * as React from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
    Platform
} from 'react-native';

// components
import Genres from '../components/Genres';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import ImagemBackground from '../components/ImagemBackground';

// apiService
import { getFilmes } from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const pathUrl = 'movie/upcoming';

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const FilmesEmBreve = ({ navigation }) => {
    
    const [movies, setMovies] = React.useState([]);
    const scrollX = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {

        const recuperarFilmes = async () => {
            const filmes = await getFilmes(pathUrl);
            setMovies([{ key: 'empty-left' }, ...filmes, { key: 'empty-right' }]);
        }

        if (movies.length === 0) {
            recuperarFilmes(movies)
        }

    }, [movies]);

    if (movies.length === 0) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <ImagemBackground movies={movies} scrollX={scrollX} />
            <StatusBar hidden />
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={movies}
                keyExtractor={(item) => item.key}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: 'center' }}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    index.toString()
                    if (!item.poster) {
                        return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE,
                    ];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [100, 50, 100],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={{ width: ITEM_SIZE }}>
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2,
                                    alignItems: 'center',
                                    transform: [{ translateY }],
                                    backgroundColor: 'white',
                                    borderRadius: 34,
                                }}
                            >
                                <Image
                                    source={{ uri: item.poster }}
                                    style={styles.posterImage}
                                />
                                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Rating rating={item.rating} />
                                <Genres genres={item.genres} />
                                <TouchableOpacity onPress={() =>
                                    navigation.push('embreve/detalhes', {filme: item})
                                }>
                                    <Button style={{backgroundColor: '#0040FF'}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>Ver mais</Text>
                                    </Button>
                                </TouchableOpacity >
                            </Animated.View>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE * 1.2,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
});

export default FilmesEmBreve;