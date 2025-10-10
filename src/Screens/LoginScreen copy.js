import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import GradientBackground from '../components/GradientBackground';
import styles from '../css/styles';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [isEmailFocused, setIsEmailFocused] = useState(false); // Separate state for email input
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Separate state for password input

  const handleLogin = () => {
    // Implement login logic here
    console.log('Logging in with email:', email, 'and password:', password);
    // Navigate to another screen after login
    // navigation.navigate('NextScreen');
    navigation.navigate('HomeTabs'); // Navigate to the home screen
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
      <Image
          source={require('../assets/images/image-removebg.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Log in to your Account</Text>
        <TextInput
          // style={styles.input}
          style={[styles.input, isEmailFocused  && styles.inputFocused]}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          // placeholderTextColor="#CBAFF8"
          placeholderTextColor={isEmailFocused ? "#CBAFF8" : "#fff"}

        />
        <TextInput
          // style={styles.input}
          style={[styles.input, isPasswordFocused && styles.inputFocused]}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          // placeholderTextColor="#CBAFF8"
          placeholderTextColor={isPasswordFocused ? "#CBAFF8" : "#fff"}

        />
        {/* <Button title="Login" onPress={handleLogin} style={styles.LoginBtn} /> */}
        <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={goToSignup} style={styles.buttonSignup}>
      <Text style={styles.text}>Signup</Text>
    </TouchableOpacity>
      </View>
    </GradientBackground>
  );
};



export default LoginScreen;
