import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from '../css/styles';
import GradientBackground from '../components/GradientBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUserData } from '../actions';
import { BASE_URL } from '@env';

import GradientBackgroundBlack from '../components/GradientBackgroundBlack';
import { ScrollView } from 'react-native-gesture-handler';
const NewPasswordScreen = ({ navigation, userData, clearUserData, route }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isOldPasswordFocused, setIsOldPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const email = route?.params?.email;

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleOldPasswordFocus = () => setIsOldPasswordFocused(true);
  const handleOldPasswordBlur = () => setIsOldPasswordFocused(false);
  const handleNewPasswordFocus = () => setIsNewPasswordFocused(true);
  const handleNewPasswordBlur = () => setIsNewPasswordFocused(false);

  const ChangePassword = async () => {
    setErrorMessage(''); // Clear previous error messages

    // Basic validation
    if (!oldPassword || !newPassword) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    if (newPassword !== oldPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/users/restpassword`, {
        email: email,
        oldPassword,
        newPassword,
      });
      console.log('Response:', response.data);

      navigation.navigate('Login');
      if (response.data.success) {
        clearUserData();
        console.log('Navigating to Login screen');
      } else {
        setErrorMessage(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <GradientBackgroundBlack>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
    <Image
        source={require('../assets/images/Tavernalogo.png')}
        style={styles.image}
      />
      <Text style={styles.title}>New Password</Text>
     
      <View style={styles.passwordContainer}>
      <TextInput
            style={[styles.input, isOldPasswordFocused && styles.inputFocused]}
            placeholder="New Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            onFocus={handleOldPasswordFocus}
            onBlur={handleOldPasswordBlur}
            secureTextEntry={!isOldPasswordVisible}
            placeholderTextColor={isOldPasswordFocused ? '#CBAFF8' : '#000'}
          />
    <TouchableOpacity
            onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
            style={styles.iconContainer}
          >
            <Icon name={isOldPasswordVisible ? 'eye' : 'eye-slash'} size={25} color="#CBAFF8" />
          </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
      <TextInput
            style={[styles.input, isNewPasswordFocused && styles.inputFocused]}
            placeholder="Confirm Password"
            value={newPassword}
            onChangeText={setNewPassword}
            onFocus={handleNewPasswordFocus}
            onBlur={handleNewPasswordBlur}
            secureTextEntry={!isNewPasswordVisible}
            placeholderTextColor={isNewPasswordFocused ? '#CBAFF8' : '#000'}
          />
     <TouchableOpacity
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            style={styles.iconContainer}
          >
            <Icon name={isNewPasswordVisible ? 'eye' : 'eye-slash'} size={25} color="#CBAFF8" />
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={ChangePassword}>
           <Text style={styles.buttonText}>Submit</Text>
         </TouchableOpacity>
    
      <Text style={styles.text}>Don't have an account?</Text>
      <TouchableOpacity onPress={goToLogin} style={styles.buttonSignup}>
        <Text style={styles.texthighlight}>Signup</Text>
      </TouchableOpacity>
      
    </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </GradientBackgroundBlack>
 
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => dispatch(clearUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordScreen);
