import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Loading from '../components/Loading';
import { ApiFilmes, getImagePath } from '../services/api';
import { Row, Column } from 'react-native-responsive-grid'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const pathUrl = 'person/';

const PersonagemDetalhes = ({ route }) => {

  const personagem = route.params.personagem;

  const [pessoa, setPessoa] = React.useState({});
  const [personagens, setPersonages] = React.useState([]);

  React.useEffect(() => {

    const obterPersonagem = async () => {
      const personagens = await ApiFilmes.get(pathUrl + personagem.id + '/movie_credits');
      setPersonages([...personagens.data.cast]);
    }

    if (personagens.length === 0) {
      obterPersonagem(personagens)
    }

    const obterPessoa = async () => {
      const pessoa = await ApiFilmes.get(pathUrl + personagem.id);
      setPessoa({ ...pessoa.data });
    }

    if (Object.keys(pessoa).length === 0) {
      obterPessoa(pessoa)
    }

  }, []);

  if (personagens.length === 0 || Object.keys(pessoa).length === 0) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: getImagePath(personagem.profile_path) }}
          style={{
            width,
            height,
            opacity: 0.1,
            // position: 'relative'
          }}
        />
        <View style={{ top: 85, position: 'absolute', margin: 10, height: 250 }}>
          <ScrollView>
            <Row >
              <Column size={30}>
                <Text>Nome:</Text>
                <Text>Data de Nasc:</Text>
                <Text>Local de Nasc:</Text>
              </Column>
              <Column size={60}>
                <Text>{pessoa.name}</Text>
                <Text>{new Date(pessoa.birthday).toLocaleDateString()}</Text>
                <Text>{pessoa.place_of_birth}</Text>
              </Column>
            </Row>
            <Row>
              <Text>Biografia:</Text>
              <Text>{pessoa.biography}</Text>
            </Row>
          </ScrollView>
        </View>

        <View style={{ flex: 1, position: 'absolute', bottom: 5}}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Filmes</Text>
          <FlatList
            data={personagens}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment='start'
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item, index }) => {
              index.toString();
              if (!item.poster_path) {
                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              }

              return (
                <>
                  <View style={{ width: ITEM_SIZE }}>
                    <View style={{
                      marginHorizontal: 2,
                      padding: 6 * 2,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderRadius: 24
                    }}>
                      <Image
                        source={{ uri: getImagePath(item.poster_path) }}
                        style={styles.posterImage} />
                    </View>
                  </View>
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

export default PersonagemDetalhes;