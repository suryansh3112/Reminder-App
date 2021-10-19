import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import AddEventScreen from './app/screens/AddEventScreen';
import EventScreen from './app/screens/EventScreen';
import EventDetailsScreen from './app/screens/EventDetailsScreen';
import EditEventScreen from './app/screens/EditEventScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const EventStack = createNativeStackNavigator();

function EventDetailStack() {
  return (
    <EventStack.Navigator
      screenOptions={({ navigation, route }) => ({
        header: () => null,
      })}
    >
      <EventStack.Screen name='EventScreen' component={EventScreen} />
      <EventStack.Screen
        name='EventDetailsScreen'
        component={EventDetailsScreen}
      />
      <EventStack.Screen name='EditEventScreen' component={EditEventScreen} />
    </EventStack.Navigator>
  );
}

export default function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style='dark' />
        {!isLogged ? (
          <AuthStack.Navigator
            screenOptions={({ navigation, route }) => ({
              headerShown: false,
            })}
          >
            <AuthStack.Screen name='Login' component={Login} />
            <AuthStack.Screen name='Register' component={Register} />
          </AuthStack.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={({ navigation, route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'EventDetailStack') {
                  iconName = focused ? 'ios-home' : 'ios-home-outline';
                } else if (route.name === 'AddEventScreen') {
                  iconName = focused
                    ? 'ios-add-circle-sharp'
                    : 'ios-add-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name='EventDetailStack' component={EventDetailStack} />
            <Tab.Screen name='AddEventScreen' component={AddEventScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
  },
});
