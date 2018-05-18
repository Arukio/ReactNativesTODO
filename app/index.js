import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from './components/TaskList';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TaskList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42f1f4',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
