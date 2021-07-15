import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
// import Router from './src/routes';
import MainApp from './src/routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainApp />
    </NavigationContainer>
  );
};

export default App;
