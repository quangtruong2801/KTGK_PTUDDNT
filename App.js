import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MyContextControllerProvider } from './comp/Context/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Router from './comp/Screens/Router';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <MyContextControllerProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
}

export default App;