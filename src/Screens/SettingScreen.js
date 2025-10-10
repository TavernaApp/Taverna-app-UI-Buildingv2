import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { clearUserData } from '../actions';
import axios from 'axios';
import Popup from '../components/CustomPopup';
import { BASE_URL } from '@env'; // Correct import for the base URL
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = ({ navigation, userData, clearUserData }) => {
  const [isSignOutPopupVisible, setSignOutPopupVisible] = useState(false);
  const [isDeleteAccountPopupVisible, setDeleteAccountPopupVisible] = useState(false);

  const openSignOutPopup = () => {
    setSignOutPopupVisible(true);
  };

  const closeSignOutPopup = () => {
    setSignOutPopupVisible(false);
  };

  const openDeleteAccountPopup = () => {
    setDeleteAccountPopupVisible(true);
  };

  const closeDeleteAccountPopup = () => {
    setDeleteAccountPopupVisible(false);
  };

  const openBlockPopup = () => {
    navigation.navigate('BlockedList');
  };

  const handleGoBack = () => {
    navigation.navigate('My Profile');
  };

  const handleGoEmail = () => {
    navigation.navigate('ChangeEmailScreen');
  };

  const handleGoPassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const handleGoProfileImage = () => {
    navigation.navigate('ChangeProfileImageScreen'); // Ensure you have this route configured
  };

  const handleSignOut = async () => {
    try {
      const token = userData?.token;
      if (!token) {
        navigation.navigate('Login');
        return;
      }
  
      // Make sign out request to server
      const response = await axios.post(`${BASE_URL}/api/users/signout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Sign out successful:', response?.data);
  
      // Clear AsyncStorage
      await AsyncStorage.clear();
  
      // Clear Redux user data
      clearUserData();
  
      // Navigate to Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign out error:', error);
      clearUserData();
    }
  };

  const handleDelete = async () => {
    try {
      const token = userData?.token;
      const response = await axios.delete(`${BASE_URL}/api/users/${userData?.user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Account delete successful:', response?.data);
      clearUserData();
      navigation.navigate('Signup');
    } catch (error) {
      console.error('Account delete error:', error);
      // Handle specific error cases if needed
    }
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <ScrollView>
        <View style={styles.SettingIncontainer}>
        <View style={styles.conties}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
              <Icon name="chevron-left" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View >
            <Text style={styles.Rectatext}>Settings</Text>
          </View>
          </View>
          <TouchableOpacity style={styles.RB} onPress={handleGoProfileImage}>
            <Text style={styles.RBT}>Change Profile Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB} onPress={handleGoEmail}>
            <Text style={styles.RBT}>Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB} onPress={handleGoPassword}>
            <Text style={styles.RBT}>Change Password</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.RB}>
            <Text style={styles.RBT}>Change Profile Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB}>
            <Text style={styles.RBT}>Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB}>
            <Text style={styles.RBT}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB}>
            <Text style={styles.RBT}>Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB}>
            <Text style={styles.RBT}>Change Profile Image</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.RB} onPress={openBlockPopup}>
            <Text style={styles.RBT}>Blocked Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.RB} onPress={openSignOutPopup}>
            <Text style={styles.RBT}>Sign Out</Text>
          </TouchableOpacity>
          <Popup
            visible={isSignOutPopupVisible}
            onClose={closeSignOutPopup}
            onConfirm={handleSignOut}
            message="Are you sure you want to sign out?"
          />
          <TouchableOpacity style={styles.RB} onPress={openDeleteAccountPopup}>
            <Text style={styles.RBTD}>Delete Account</Text>
          </TouchableOpacity>
          <Popup
            visible={isDeleteAccountPopupVisible}
            onClose={closeDeleteAccountPopup}
            onConfirm={handleDelete}
            message="Are you sure you want to delete your account?"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => dispatch(clearUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
