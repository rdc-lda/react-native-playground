import React from 'react';
import { Text, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Contacts from '../screens/Contacts';
import Details from '../screens/Details';
import NewContact from '../screens/NewContact';
import Me from '../screens/Me';

import { capitalizeFirstLetter } from '../helpers/string'
import colors from '../config/colors';

export const ContactsStack = createStackNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      title: 'Contacts',
    }
  },
  Details: {
    screen: Details,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name.first.capitalizeFirstLetter() + " " +
        navigation.state.params.name.last.capitalizeFirstLetter(),
    }),
  },
});

export const NewContactStack = createStackNavigator({
  NewContact: {
    screen: NewContact,
    navigationOptions: {
      title: 'New Contact',
    }
  },
});

export const MeStack = createStackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      title: 'Me',
    }
  },
});

export const Stack = createAppContainer(ContactsStack);

export const Tabs = createAppContainer(
  createBottomTabNavigator(
    {
      AllContactsTab: ContactsStack,
      NewContactTab: NewContactStack,
      MeTab: MeStack,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          let IconComponent = Ionicons;
          let iconName;

          if (routeName === 'AllContactsTab') {
            iconName = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
          } else if (routeName === 'NewContactTab') {
            iconName = Platform.OS === 'ios' ? 'ios-add' : 'md-add';
          } else {
            iconName = Platform.OS === 'ios' ? 'ios-contact' : 'md-contact';
          }
          // We should externalize this in its own component including 
          // the logic for rendering for Android or iOS icons and style hints
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
        tabBarLabel: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let tabBarLabel;

          if (routeName === 'AllContactsTab') {
            tabBarLabel = `Contacts`;
          } else if (routeName === 'NewContactTab') {
            tabBarLabel = `New Contact`;
          } else {
            tabBarLabel = `Me`;
          }
          // We should externalize this in its own component including 
          // the applied style sheets (do not like this is hard-coded)
          return <Text style={{ textAlign: 'center', fontSize: 10, color: tintColor }}>{tabBarLabel}</Text>;
        },
      }),
      tabBarOptions: {
        activeTintColor: colors.tabIconActive,
        inactiveTintColor: colors.tabIconInactive,
      },
    }
  )
);