import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUserData } from '../actions';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import GradientBackgroundBlack from '../components/GradientBackgroundBlack';
import styles from '../css/styles';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { BASE_URL } from '@env'; // Correct import for the base URL

const LoginScreen = ({ navigation, addUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      // Simulating login request
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email: email,
        password: password,
      });

      console.log(response); // Log the response data

      const userData = response.data;
      addUserData(userData);

      // Store entire userData object in AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Log success message
      console.log('User data stored in AsyncStorage:', userData);

      setEmail('');
      setPassword('');
      navigation.navigate('HomeTabs');
    } catch (error) {
      // setError('Incorrect email or password' + error.message);
      setError('Incorrect Email or Password');

      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  const goToForgot = () => {
    navigation.navigate('Forgot');
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
        <Text style={styles.title}>Log in to your Account</Text>
        <TextInput
          style={[styles.input, isEmailFocused && styles.inputFocused]}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={isEmailFocused ? '#CBAFF8' : 'gray'}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused, styles.passwordInput]}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={isPasswordFocused ? '#CBAFF8' : 'gray'}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={25} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="red" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={goToForgot} style={{marginBottom:10}} >
          <Text style={{color:"white",textAlign:"left"}}>Forgot Password</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={goToSignup} style={styles.buttonSignup}>
          <Text style={styles.texthighlight}>Signup</Text>
        </TouchableOpacity>
        <CustomAlert
          visible={showAlert}
          message={error}
          onClose={() => setShowAlert(false)}
        />
      </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackgroundBlack>
  );
};

const mapDispatchToProps = {
  addUserData,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
