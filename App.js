
import React, { useState, useEffect, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform, Button } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenB from './screens/ScreenB';
import ScreenA from './screens/ScreenA'
import { Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from "react-native";
import { TextInput } from 'react-native';

const InputExample = () => {
  const [text, setText] = useState('');

  const handleTextChange = (newText) => {
    setText(newText);
  }; S

  return (
    <View>
      <Text>Please enter your name:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleTextChange}
        value={text}
      />
      <Text>Your name is: {text}</Text>
    </View>
  );
};

export { InputExample };

const Stack = createStackNavigator();

function MapScreen() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.7885,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrormsg('Permission to access location Denied')
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }
  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container} >
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='marker' />
      </MapView>
      <Button title='GET LOCATION' onPress={userLocation} />
    </View>
  );
}

function Screen({ navigation }) {

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#007aff",
          paddingHorizontal: 30,
          paddingVertical: 5,
          borderRadius: 5
        }}
        onPress={() => navigation.navigate("ScreenB", { message: 'Come from Screen A' })}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: '400',
            color: "#fff",
          }}
        >
          Go to ScreenB
        </Text>
      </TouchableOpacity>
    </View>
  );

};
function HomeScreen({ navigation }) {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Map" component={MapScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
