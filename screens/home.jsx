import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const Home = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo!</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    alignContent: 'center',
  },
  text: {
    top: 250,
    fontSize: 30
    
  }
})

export default Home;