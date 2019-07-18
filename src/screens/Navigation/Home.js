import { Navigation } from 'react-native-navigation';

export const HomeView = () => Navigation.setRoot({
    root:{
      component: {
        name: "dashboard"
      }
    }
});
  // Navigation.setRoot({
  //   root:{
  //     sideMenu: {
  //       left: {
  //         component: {
  //           name: "sidedrawer"
  //         }
  //       },
  //       center: {
  //         stack: {
  //           options: {
  //             bottomTab: {
  //               text: 'tab1',
  //               icon: tab1
  //             },
  //           },
  //           children: [
  //           {
  //             component: {
  //               name: "dashboard"
  //             },
  //             component:{
  //               name: "auth"
  //             }
  //           }]
  //         },
  //       },
  //       // right: {
  //         // component: {}
  //       // }
  //     }
  //   }
  //   // root: {
  //   //   component:{
  //   //     name:"auth"
  //   //   }
  //   // }
  // });