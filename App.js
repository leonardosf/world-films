import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Home from './screens/home';
import FilmesEmBreve from './screens/filmesEmBreve';
import FilmesEmCartaz from './screens/filmesEmCartaz';
import FilmesPopulares from './screens/filmesPopulares';
import { Button, Text } from 'react-native-paper';
import Detalhes from './screens/detalhes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Button icon="menu" color="black" />
      </TouchableOpacity>
    </View>
  );
}

function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () =>
            <NavigationDrawerStructure
              navigationProps={navigation}
            />,
          headerTransparent: true,
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            fontSize: 25
          },
        }}
      />
    </Stack.Navigator>
  );
}

function emCartazScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="cartaz"
      screenOptions={{
        headerLeft: () =>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
        headerTintColor: '#000', //Set Header text color
        headerTransparent: true,
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          fontSize: 25
        }
      }}>
      <Stack.Screen
        name="cartaz"
        component={FilmesEmCartaz}
        options={{
          title: 'Em Cartaz', //Set Header Title
        }} />
      <Stack.Screen
        name="emCartaz/Detalhes"
        component={Detalhes}
        options={{
          title: 'Detalhes', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}

function popularesScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="populares"
      screenOptions={{
        headerLeft: () =>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
        headerTransparent: true,
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
          fontSize: 25
        }
      }}>
      <Stack.Screen
        name="populares"
        component={FilmesPopulares}
        options={{
          title: 'Populares', //Set Header Title
        }} />
      <Stack.Screen
        name="populares/Detalhes"
        component={Detalhes}
        options={{
          title: 'Detalhes', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}

function emBreveScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="breve"
      screenOptions={{
        headerLeft: () =>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
        headerTransparent: true,
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="breve"
        component={FilmesEmBreve}
        options={{
          title: 'Em Breve', //Set Header Title
        }} />
      <Stack.Screen
        name="emBreve/Detalhes"
        component={Detalhes}
        options={{
          title: 'Detalhes', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}

const App = () => {


  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 5 },
          }}>
          <Drawer.Screen
            name="Home"
            options={{ drawerLabel: 'Home' }}
            component={HomeScreenStack} />
          <Drawer.Screen
            name="Em Cartaz"
            options={{ drawerLabel: 'Em Cartaz' }}
            component={emCartazScreenStack} />
          <Drawer.Screen
            name="Populares"
            options={{ drawerLabel: 'Populares' }}
            component={popularesScreenStack} />
          <Drawer.Screen
            name="Em Breve"
            options={{ drawerLabel: 'Em Breve' }}
            component={emBreveScreenStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );

}

export default App;