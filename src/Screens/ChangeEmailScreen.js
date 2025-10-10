import {React,useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to import Icon
import styles from '../css/styles';
import GradientBackground from '../components/GradientBackground';
import axios from 'axios';
import { connect } from 'react-redux';
import { BASE_URL } from '@env'; // Correct import for the base URL

const ChangeEmailScreen = ({ navigation, userData ,clearUserData}) => {

  console.log(userData?.user?.id,"user id")
  const [newemail, setNewEmail] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleGoBack = () => {
    navigation.navigate('Setting');
  };

  const changeEmail = async () => {
    try { 
      const config = {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          'Content-Type': 'application/json'
        }
      };
  
      const body = {
        newEmail: newemail // Pass the value of newemail here
      };
 
 
      const response = await axios.put(
        `${BASE_URL}/api/users/change-email/${userData?.user?.id}`,
        body,
        config
      );
  
      console.log('Response:', response.data);

   
      // If email change is successful, navigate to login screen
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
    <View style={{flex:1, backgroundColor:"#2A0955"}}>
      <TouchableOpacity style={styles.backiconContainer} onPress={handleGoBack}>
        <Icon name="chevron-left" size={18} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/image-removebg-preview.png')}
          style={styles.image}
        />
        <Text style={styles.Title}>Change Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newemail}
          onChangeText={setNewEmail} // Update newemail state when input changes
          keyboardType="email-address"
        />
        <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={changeEmail}>
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

// export default ChangeEmailScreen;
// Define mapStateToProps function to map user data from Redux state to props
const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

// export default HomeScreen;
export default connect(mapStateToProps)(ChangeEmailScreen); // Connect HomeScreen to Redux store

