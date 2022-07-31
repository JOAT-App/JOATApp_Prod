import 'expo-dev-client';

import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';



import {
   en,
  // nl,
  // de,
  // pl,
  // pt,
  //enGB,
  registerTranslation,
} from 'react-native-paper-dates'
 registerTranslation('en', en)
// registerTranslation('nl', nl)
// registerTranslation('pl', pl)
// registerTranslation('pt', pt)
// registerTranslation('de', de)
//registerTranslation('en-GB', enGB)




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
