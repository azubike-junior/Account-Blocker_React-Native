import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Blocker from '../screens/Blocker';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTitle: '',
        }}
        initialRouteName="Login"
      >
        <Stack.Screen
          options={{
            gestureEnabled: false,
            headerShown: true,
            headerLeft: () => <></>,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Blocker" component={Blocker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
