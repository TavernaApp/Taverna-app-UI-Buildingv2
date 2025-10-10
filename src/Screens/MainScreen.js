import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import styles from '../css/styles'; // Import the external stylesheet
import { connect } from 'react-redux';

const MainScreen = ({ navigation, userData }) => {
  const [loginButtonColor, setLoginButtonColor] = useState("#CBAFF8");
  const [signupButtonColor, setSignupButtonColor] = useState("#CBAFF8");

  useEffect(() => {
    // If user data exists, navigate to HomeScreen
    if (userData && userData?.user?.id) {
      navigation.navigate('HomeTabs');
    }
  }, [userData]);

  const handleLoginPressIn = () => {
    setLoginButtonColor("#7000BECC"); // Change color when pressed
  };

  useEffect(()=>{
 
      setLoginButtonColor("#7000BECC"); // Change color when pressed
      setLoginButtonColor("#CBAFF8"); // Revert color when released
      console.log('Login button pressed');
      navigation.navigate('Login');
  },[])
  const handleLoginPressOut = () => {
    setLoginButtonColor("#CBAFF8"); // Revert color when released
    console.log('Login button pressed');
    navigation.navigate('Login');
  };

  const handleSignupPressIn = () => {
    setSignupButtonColor("#A3D2E8"); // Change color when pressed
  };

  const handleSignupPressOut = () => {
    setSignupButtonColor("#CBAFF8"); // Revert color when released
    console.log('Signup button pressed');
    navigation.navigate('Signup');
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/Group-603.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>Find the best Bars in your Area</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.buttonWrapper, { backgroundColor: loginButtonColor }]}
            onPressIn={handleLoginPressIn}
            onPressOut={handleLoginPressOut}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonWrapper, { backgroundColor: signupButtonColor }]}
            onPressIn={handleSignupPressIn}
            onPressOut={handleSignupPressOut}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
};

// Define mapStateToProps function to map user data from Redux state to props
const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

// Connect MainScreen to Redux store
export default connect(mapStateToProps)(MainScreen);
