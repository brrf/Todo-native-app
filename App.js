/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor (props) {
    super (props);
    this.state = {
      todos: [1,2,3],
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:3000/json', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => this.setState({
      todos: data
    }))
  }

  handleChange(text) {
    this.setState({
      input: text
    })
  }

  handlePress(e) {
  fetch('http://localhost:3000/json', {
    method: 'post',
    body: JSON.stringify({
      name: this.state.input
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    const newTodos = [...this.state.todos, data]
    this.setState({
      todos: newTodos,
      input: ''
    })
  })
}

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={this.handleChange} value={this.state.input} style={styles.input} placeholder="Add Todo"/>
        {this.state.todos.map( (todo, id) => <Text key={id}>{todo.name}</Text>)}
        <TouchableHighlight onPress={this.handlePress}>
          <Text>Submit Todo</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

/*


  */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 15,
    backgroundColor: 'crimson'
  }
});
