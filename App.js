import React from 'react';
import { Image, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Home from './screens/home';
import FilmesEmBreve from './screens/filmesEmBreve';
import FilmesEmCartaz from './screens/filmesEmCartaz';
import FilmesPopulares from './screens/filmesPopulares';

const HomeRoute = () => <Home />;
const FilmesEmCartazRoute = () => <FilmesEmCartaz />;
const FilmesPopularesRoute = () => <FilmesPopulares />;
const FilmesEmBreveRoute = () => <FilmesEmBreve />;

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
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
          style={{
            width: 25,
            height: 25,
            marginLeft: 10
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

function HomeScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="Home"
        component={HomeRoute}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () =>
            <NavigationDrawerStructure
              navigationProps={navigation}
            />,
          headerStyle: {
            backgroundColor:'transparent'
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
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
        headerStyle: {
          backgroundColor: 'transparent', //Set Header color
        },
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="Em Cartaz"
        component={FilmesEmCartazRoute}
        options={{
          title: 'Em Cartaz', //Set Header Title
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
        headerStyle: {
          backgroundColor: 'transparent', //Set Header color
        },
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="Populares"
        component={FilmesPopularesRoute}
        options={{
          title: 'Populares', //Set Header Title
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
        headerStyle: {
          backgroundColor: 'transparent', //Set Header color
        },
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="Em Breve"
        component={FilmesEmBreveRoute}
        options={{
          title: 'Em Breve', //Set Header Title
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