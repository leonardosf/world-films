import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const BACKDROP_HEIGHT = height * 0.50;

const Detalhes = ({ route }) => {

  const filme = route.params.filme;

  return (
    <>
      <View style={{ height: height, width: width, position: 'absolute' }}>
        <Image
          source={{ uri: filme.backdrop }}
          style={{
            width,
            height: BACKDROP_HEIGHT - 200,
            position: 'absolute',
            opacity: 0.3
          }}
        />
        <Text style={styles.titulo}>
          {filme.title}
        </Text>
        <Text style={styles.conteudo}>
          {filme.description}
        </Text>
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titulo: {
    top: 210,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
    
  },
  conteudo: {
    top: 210,
    margin: 20,
    textAlign: 'justify',
    position: 'relative'
  },

})

export default Detalhes;