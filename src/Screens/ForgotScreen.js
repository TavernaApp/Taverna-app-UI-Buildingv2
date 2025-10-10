import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import styles from '../css/styles'; 
import GradientBackgroundBlack from '../components/GradientBackgroundBlack';
import { ScrollView } from 'react-native-gesture-handler';

const ForgotScreen = ({ navigation, userData }) => {
  console.log(userData?.user?.id, "user id");

  const [newemail, setNewEmail] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const changeEmail = async () => {
    navigation.navigate('ForgotOTP', { email: newemail });
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
      <Text style={styles.title}>Forget Password</Text>
      <TextInput
          style={styles.input}
          placeholder="Email"
          value={newemail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
        />
     
     <TouchableOpacity style={[styles.buttonWrapper, styles.LoginBtn]} onPress={changeEmail}>
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
  userData: state.user.userData, // Ensure user data is correctly mapped from state
});

export default connect(mapStateToProps)(ForgotScreen);
