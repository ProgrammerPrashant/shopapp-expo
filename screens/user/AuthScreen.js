import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { ScrollView, View, Button, KeyboardAvoidingView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth'; 

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };
  


const AuthScreen = props => {

    const[isSignup, setIsSignup] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const authHandler = async() => {
        let action;
            if(isSignup) {
                
             action = authActions.signup(formState.inputValues.email, formState.inputValues.password);

            }
            else {

                action = authActions.login(formState.inputValues.email, formState.inputValues.password);


            }
            setError(null);
            setIsLoading(true);
            try {
                await dispatch(action);
                props.navigation.navigate('Shop');
            }
            catch (err) {
                    setError(err.message);
                    setIsLoading(false);
            }
        
        
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
        email : '',
        password: ''
        },
        inputValidities: {
         email: false,
         password: false
        },
        formIsValid : false
      });
    
      useEffect(() => {
            if(error) {
                Alert.alert('An Error Occured', error, [{ text: 'Okay' }]);
            }
      }, [error]);

    return (
        <KeyboardAvoidingView behavior='padding'
         keyboardVerticalOffset={50}
          style={styles.screen}>
              <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient} >
        <Card style={styles.authContainer}>
            <ScrollView>
                <Input id='email' label='E-Mail' keyboardType='email-address' required
                 email 
                 autoCapitalize='none'
                 errorText="Enter Valid Mail"
                 onInputChange={inputChangeHandler}
                 initialValue=""
                 />

<Input id="password" label="Password" keyboardType="default" required
                 minLength={5} 
                 secureTextEntry
                 autoCapitalize="none"
                 errorText="Enter Valid Password"
                 onInputChange={inputChangeHandler}
                 initialValue=""
                 />

                 <View style={styles.buttonContainer}>
                     {isLoading ?  ( <ActivityIndicator size='large' color="red" /> ) : ( <Button
                      title={isSignup ? 'Sign Up' : 'Login'}
                       color={Colors.primany}
                        onPress={authHandler}
                     /> )}
                         
                         </View>
                 <View style={styles.buttonContainer}><Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={Colors.secondary} onPress={() => {
                     setIsSignup(prevState => !prevState);
                 }} /></View>

            </ScrollView>
        </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
    );

};

AuthScreen.navigationOptions = {
    headerTitle : 'Authenticate'
}

const styles = StyleSheet.create({

    screen: {
        flex:1,
        
    },
    authContainer : {
        width : '80%',
        maxWidth: 400,
       padding:20,
        maxHeight: 400
    },

    gradient: {

        justifyContent: 'center',
        alignItems: 'center',
      flex: 1

    },

    buttonContainer: {
        marginTop: 10
    }

});

export default AuthScreen;