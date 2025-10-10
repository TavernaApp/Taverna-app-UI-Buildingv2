import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../css/styles';
// import GradientBackground from '../components/GradientBackground';
import GradientBackgroundBlack from '../components/GradientBackgroundBlack'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import { BASE_URL } from '@env'; // Correct import for the base URL

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isUserNameFocused, setIsUserNameFocused]= useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return usernamePattern.test(username);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSignup = async () => {
    const emptyFields = [];
    if (!username) emptyFields.push('Username');
    if (!email) emptyFields.push('Email');
    if (!password) emptyFields.push('Password');

    if (emptyFields.length > 0) {
      setAlertMessage(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      setAlertVisible(true);
      return;
    }

    if (!validateEmail(email)) {
      setAlertMessage('Please enter a valid email address');
      setAlertVisible(true);
      return;
    }

    if (!validateUsername(username)) {
      setAlertMessage('Please enter a valid username');
      setAlertVisible(true);
      return;
    }

    if (!validatePassword(password)) {
      setAlertMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long');
      setAlertVisible(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/users`, {
        username,
        email,
        password
      });
      console.log("Signup Successful", response.data);
      navigation.navigate('OTPScreen', { email });

      // navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  }

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
        <Text style={styles.title}>Create your Account</Text>
        <TextInput
          style={[styles.input, isEmailFocused && styles.inputFocused]}
          onFocus={() => setIsUserNameFocused(true)}
          onBlur={() => setIsUserNameFocused(false)}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={isUserNameFocused ? '#CBAFF8' : 'gray'}

        />
        <TextInput
        style={[styles.input, isEmailFocused && styles.inputFocused]}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
           autoCapitalize="none"
           placeholderTextColor={isEmailFocused ? '#CBAFF8' : 'gray'}
          keyboardType="email-address"
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
            <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={25} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Signup</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={goToLogin} style={styles.buttonSignup}>
          <Text style={styles.texthighlight}>Log In</Text>
        </TouchableOpacity>
        <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
      </View>
  </ScrollView>
      </KeyboardAvoidingView>
   
    
    </GradientBackgroundBlack>
  );
};

export default SignUpScreen;
