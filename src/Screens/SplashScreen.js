import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addUserData } from '../actions'; // Assuming you have defined this action
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import GradientBackground from '../components/GradientBackground';

const SplashScreen = ({ navigation, addUserData }) => {
  useEffect(() => {
    const checkStorageAndNavigate = async () => {
      try {
        // Retrieve userData from AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData');

        // Check if userData exists
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log('User data found in AsyncStorage:', userData);
          
          // Dispatch action to store userData in Redux
          addUserData(userData);

          navigation.replace('HomeTabs'); // Navigate to HomeTabs if userData exists
        } else {
          navigation.replace('Main'); // Navigate to Main (Login) screen if userData is missing
        }
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
        navigation.replace('Main'); // Navigate to Main screen in case of error
      }
    };

    checkStorageAndNavigate(); // Immediately check AsyncStorage on component mount

    // No timeout needed as we're checking AsyncStorage immediately

  }, [navigation, addUserData]);

  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Add your splash screen image or any content here */}
        <Image
          source={require('../assets/images/Group-602.png')}
          style={styles.image}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%', // Adjust the size as needed
    height: '50%', // Adjust the size as needed
    resizeMode: 'contain', // Adjust the image display mode
  },
});

// Connect SplashScreen to Redux store
const mapDispatchToProps = {
  addUserData,
};

export default connect(null, mapDispatchToProps)(SplashScreen);
