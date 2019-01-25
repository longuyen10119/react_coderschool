import React from 'react';
import { createAppContainer } from 'react-navigation';
import Navigator from './navigation/AppNavigator';

const App = createAppContainer(Navigator);

export default App;