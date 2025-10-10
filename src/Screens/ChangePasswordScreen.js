import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../css/styles';
import GradientBackground from '../components/GradientBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { connect } from 'react-redux';
import { clearUserData } from '../actions';
import { BASE_URL } from '@env'; // Correct import for the base URL

const ChangePasswordScreen = ({ navigation, userData, clearUserData }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isOldPasswordFocused, setIsOldPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleOldPasswordFocus = () => setIsOldPasswordFocused(true);
  const handleOldPasswordBlur = () => setIsOldPasswordFocused(false);
  const handleNewPasswordFocus = () => setIsNewPasswordFocused(true);
  const handleNewPasswordBlur = () => setIsNewPasswordFocused(false);

  const handleGoBackSetting = () => {
    navigation.navigate('Setting');
  };

  const ChangePassword = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          'Content-Type': 'application/json',
        },
      };

      const body = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      const response = await axios.put(
        `${BASE_URL}/api/users/change-password/${userData?.user?.id}`,
        body,
        config
      );

      console.log('Response:', response.data);
      clearUserData();

      // If password change is successful, navigate to login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.data) {
        // Check if error message is available in the response data
        if (error.response.data.message) {
          // If error message is available, set it to errorMessage state
          setErrorMessage(error.response.data.message);
        } else {
          // If no error message, set a generic error message
          setErrorMessage('An error occurred. Please try again later.');
        }
      } else {
        // If there's no response data, set a generic error message
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={{flex:1,backgroundColor:"#2A0955"}}>
      <TouchableOpacity style={{marginHorizontal:'5%', marginVertical:16}} onPress={handleGoBackSetting}>
        <Icon name="chevron-left" size={18} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/image-removebg-preview.png')}
          style={styles.image}
        />
        <Text style={styles.Title}>Change Password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isOldPasswordFocused && styles.inputFocused]}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            onFocus={handleOldPasswordFocus}
            onBlur={handleOldPasswordBlur}
            secureTextEntry={!isOldPasswordVisible}
            placeholderTextColor={isOldPasswordFocused ? '#CBAFF8' : '#fff'}
          />
          <TouchableOpacity
            onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
            style={styles.iconContainer}
          >
            <Icon name={isOldPasswordVisible ? 'eye' : 'eye-slash'} size={25} color="#CBAFF8" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isNewPasswordFocused && styles.inputFocused]}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            onFocus={handleNewPasswordFocus}
            onBlur={handleNewPasswordBlur}
            secureTextEntry={!isNewPasswordVisible}
            placeholderTextColor={isNewPasswordFocused ? '#CBAFF8' : '#fff'}
          />
          <TouchableOpacity
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            style={styles.iconContainer}
          >
            <Icon name={isNewPasswordVisible ? 'eye' : 'eye-slash'} size={25} color="#CBAFF8" />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={ChangePassword}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={goToLogin} style={styles.buttonSignup}>
          <Text style={styles.texthighlight}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define mapStateToProps function to map user data from Redux state to props
const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => dispatch(clearUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);
