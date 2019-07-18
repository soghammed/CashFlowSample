import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configStore from './src/store/configStore';
import AuthScreen from './src/screens/Auth/Auth';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';
import DashboardScreen from './src/screens/Dashboard/Dashboard';
import InboundScreen from './src/screens/Inbound/Inbound';
import OutboundScreen from './src/screens/Outbound/Outbound';
import FlexboxScreen from './src/screens/Playground/Flexbox/Flexbox';
import SettingsScreen from './src/screens/Settings/Settings';
import ThemeSettingsScreen from './src/screens/Settings/Theme';
import ToDoListScreen from './src/screens/ToDoList/ToDoList';
import DashboardButtonGroup from './src/screens/Dashboard/ButtonGroupComp';
import AddItem from './src/screens/AddItem/AddItem';
import Icon from 'react-native-vector-icons/Ionicons';

// console.log('configStore:', configStore);
const store = configStore();
// console.log('store:', store);
Navigation.registerComponent(
  "auth",
  () => AuthScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "dashboard",
  () => DashboardScreen,
  store,
  Provider
);
//all settings
Navigation.registerComponent(
  "settings",
  () => SettingsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "settings.theme",
  () => ThemeSettingsScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "sidedrawer",
  () => SideDrawerScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "toDoList",
  () => ToDoListScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "dashboard.buttongroup",
  () => DashboardButtonGroup,
  store,
  Provider
);

Navigation.registerComponent(
  "addItem",
  () => AddItem,
  store,
  Provider
);


Navigation.startSingleScreenApp({

  screen: {
    screen: "auth",
    navigatorStyle: {
      drawUnderNavBar: true,
      navBarHidden: true
      // navBarTransparent: true,
      // navBarTranslucent: true 
    },
    // navigationBarStyle:{ navBarHidden: true },
  }

});



//for RNNavigation2 but dxowngraded./
//Navigation.registerComponent('auth', () => (props) => {
//   return (
//     <Provider store={store}>
//       <Auth {...props}/>
//     </Provider>
//   );
// }, () => Auth);
// Navigation.registerComponent('dashboard', () => Dashboard);
// Navigation.registerComponent('inbound', () => Inbound);
// Navigation.registerComponent('outbound', () => Outbound);
// Navigation.registerComponent('playground.flexbox', () => Flexbox);
// Navigation.registerComponent('sidedrawer', () => SideDrawer);


// Navigation.events().registerAppLaunchedListener(() => {
  
//   Navigation.setRoot({
//     root: {
//       bottomTabs: {
//         children: [
//           {
//             component: {
//               name: 'auth',
//               options: {
//                 bottomTab: {
//                   text: 'Tab 2',
//                   // icon: require('../images/two.png')
//                 }
//               }
//             }
//           },
//           {
//             component: {
//               name: 'dashboard'
//             }
//           },
//         ],
//       },
//     }
//   });

// });