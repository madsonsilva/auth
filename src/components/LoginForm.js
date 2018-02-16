import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

    state = {
        email: '', password: '', error: '', isLoading: false,
    };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({ error: '', isLoading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucess.bind(this))
            .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(this.onLoginSucess.bind(this))
                        .catch((error) => this.onLoginFail(error));
            });
    }

    onButtonLogoutPress() {
        console.log('make log out!');
    }

    onLoginFail(err) {
        if (err.code === 'auth/weak-password') {
            return this.setState({ error: 'The password is too weak!', isLoading: false });
        }
        return this.setState({ error: 'Authentication Failed.', isLoading: false });
    }

    onLoginSucess() {
        this.setState({ 
            email: '',
            password: '',
            isLoading: false,
            error: '',
        });
    }

    //SHOW SPINNER OR BUTTON
    renderButton() {
        if (this.state.isLoading === true) {
            return <Spinner size='small' />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}> Log in </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        keyboardType='email-address'
                        placeholder="user@email.com"
                    />

                </CardSection>


                <CardSection>
                    <Input 
                        placeholder="password"
                        value={this.state.password}
                        label='Password'
                        onChangeText={password => this.setState({ password })}
                        isSecure
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    { this.renderButton() }
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
};

export default LoginForm;
