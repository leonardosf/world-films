import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../components/Loading';
import { ApiFilmes, getImagePath } from '../services/api';

const { width, height } = Dimensions.get('window');
const BACKDROP_HEIGHT = height * 0.50;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const pathUrl = 'movie/credits';

const FilmesDetalhes = ({ route, navigation }) => {

  const filme = route.params.filme;

  const [creditos, setCreditos] = React.useState([]);

  React.useEffect(() => {

    const obterCreditos = async () => {
      const creditos = await ApiFilmes.get(`movie/${filme.key + pathUrl}`);
      setCreditos([...creditos.data.cast]);
    }

    if (creditos.length === 0) {
      obterCreditos(creditos)
    }

  }, [creditos]);

  if (creditos.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: filme.backdrop }}
          style={{
            width,
            height: BACKDROP_HEIGHT - 100,
            opacity: 0.1,
            position: 'absolute',
          }}
        />
        <View style={{ position: 'relative', top: 80, height: 250 }}>
          <ScrollView>
            <Text style={styles.titulo}>
              {filme.title}
            </Text>
            <Text style={styles.conteudo}>
              {filme.description}
            </Text>
          </ScrollView>
        </View>

        <View style={{ position: 'absolute', bottom: 5 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Elenco</Text>
          <FlatList
            data={creditos}
            keyExtractor={(item) => item.cast_id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment='start'
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item, index }) => {
              index.toString();
              if (!item.profile_path) {
                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              }

              return (
                <>
                  <TouchableOpacity onPress={() =>
                    navigation.push('personagem/detalhes', { personagem: item })
                  }>
                  <View style={{ width: ITEM_SIZE }}>
                    <View style={{
                      marginHorizontal: 2,
                      padding: 6 * 2,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 24
                    }}>
                      <Text style={{ padding: 5 }}>Personagem: {item.character}</Text>
                      <Image
                        source={{ uri: getImagePath(item.profile_path) }}
                        style={styles.posterImage} />
                      <Text style={{ padding: 5 }}>{item.name}</Text>
                    </View>
                  </View>
                  </TouchableOpacity >
                </>
              )
            }}>
          </FlatList>
        </View>
      </View >

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  conteudo: {
    margin: 20,
    textAlign: 'justify',
  },
  card: {
    height: 30,
    width: height
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },

})

export default FilmesDetalhes;