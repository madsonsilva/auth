import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedin: false
  };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCLDjohgMIHC0uLpzY5cxTDPEaJbZy0ZYg',
        authDomain: 'auth-ms-reactnative.firebaseapp.com',
        databaseURL: 'https://auth-ms-reactnative.firebaseio.com',
        projectId: 'auth-ms-reactnative',
        storageBucket: 'auth-ms-reactnative.appspot.com',
        messagingSenderId: '994356123495'
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedin: true });
        } else {
          this.setState({ loggedin: false });
        }
    });
  }

  renderContent() {
    switch (this.state.loggedin) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out 
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }   
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
