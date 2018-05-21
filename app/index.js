import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from './components/TaskList';
import { createStackNavigator } from 'react-navigation';
import EditTask from './components/EditTask';

const RootStack = createStackNavigator({
  Home: TaskList,
  Edit: EditTask,
},{
  initialRouteName: 'Home'
})

export default class App extends React.Component {
  render(){
    return <RootStack />
  }
}
