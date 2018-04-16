import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Body, Title, Content, List, ListItem, Button, Icon } from 'native-base';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import DetailNewsScreen from "./screens/detail_news";
import HomeScreen from "./screens/home";
import DataItem from './components/list_item';
import { getArticles } from './services/news';

const DrawerButton = (props) => {
	return (
      <Button style={{height: '100%'}} transparent onPress={() => props.navigate.navigate('DrawerOpen')}>
      <Icon style={{color: '#fff'}} name='menu' />
      </Button>
  );
};



const RootStack = StackNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: (props) => ({
            headerStyle: {
                backgroundColor: '#303030'
              },
            title: "PrimeNews",
            headerLeft: <DrawerButton navigate={props.screenProps.drawerNavigation.navigation}  />
          }),
      },
      DetailNewsScreen: {
        screen: DetailNewsScreen,
      },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#303030'
              },
              title: "PrimeNews",
              headerTintColor: '#fff'
          },
    }
    
  );

  const RootDrawer = DrawerNavigator(
      {
          Trending: {
             screen: (navigation) => <RootStack screenProps={{ topic: 'general', drawerNavigation:navigation}} />,
          },
          Technology: {
            screen: (navigation) => <RootStack screenProps={{ topic: 'technology', drawerNavigation:navigation}} />,
         },
         Sport: {
            screen: (navigation) => <RootStack screenProps={{ topic: 'sport', drawerNavigation:navigation}} />,
         },
         Business: {
            screen: (navigation) => <RootStack screenProps={{ topic: 'business', drawerNavigation:navigation}} />,
         },
         Entertainment: {
            screen: (navigation) => <RootStack screenProps={{ topic: 'entertainment', drawerNavigation:navigation}} />,
         },
         Health: {
            screen: (navigation) => <RootStack screenProps={{ topic: 'health', drawerNavigation:navigation}} />,
         },
         Science: {
            screen: (navigation) => <RootStack screenProps={{ topic: 'science', drawerNavigation:navigation}} />,
         },
      },
  )
  
  export class Root extends React.Component {
    render() {
      return <RootDrawer />;
    }
  }

 
  