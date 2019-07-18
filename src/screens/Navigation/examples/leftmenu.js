 Navigation.setRoot({
    root: {
      //wrap all in sideMenu: { left: { } centre: {} } so bottomTabs goes within centre
      bottomTabs: {
        children: [
        { 
          component: {
            name: 'auth',
            // passProps: {
            //   text: 'This is tab 2'
            // },
            options: {
              bottomTab: {
                text: 'Dashboard',
                icon: tab1,
                testID: 'DashboardTab'
              },
            }
          },
          stack: {
            children: [{
              component: {
                name: "dashboard",
                passProps: {
                  text: 'This is tab 1'
                }
              },
            }],
            options: {
              bottomTab: {
                text: 'Dashboard 1',
                icon: tab2,//require('src/assets/images/one.jpg'),
                testID: 'FIRST_TAB_BAR_BUTTON'
              },
              topBar: {
                title: {
                  text: "Dashboard",
                },
                leftButtons: [{
                  id: "buttonOne",
                  // icon: tab2,
                  // text: "myutton",
                }]
              }
            }
          }
        },
        {
          component: {
            name: 'playground.flexbox',
            passProps: {
              text: 'This is tab 2'
            },
            options: {
              bottomTab: {
                text: 'Tab 2',
                icon: tab1,
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          }
        }]
      }
    }
  });