import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import styles from '../css/styles'; // Ensure you have styles defined for OTP input fields
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import { BASE_URL } from '@env'; // Ensure BASE_URL is imported correctly

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Array to store OTP digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState(null);
  const [timer, setTimer] = useState(59); // Timer set to 59 seconds initially
  const [timerActive, setTimerActive] = useState(false); // Flag to control timer activation
  const email = route?.params?.email;

  const otpInputRefs = useRef([]); // Ref to store references of OTP TextInput components

  useEffect(() => {
    // Auto-submit OTP if all fields are filled
    const filled = otp.every((digit) => digit !== '');
    if (filled) {
      handleVerifyOTP();
    }
  }, [otp]);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setTimerActive(false);
            return 59; // Reset timer to 59 seconds after countdown
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Function to handle OTP digit input
  const handleOTPInputChange = (index, value) => {
    if (isNaN(value)) {
      return; // Allow only numeric values
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input box after input
    if (value !== '' && index < otp.length - 1) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join(''); // Combine array into a single string
    if (enteredOTP.length !== 6) {
      setError('Please enter a valid OTP.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      // Make API call to verify OTP
      const response = await axios.post(`${BASE_URL}/api/users/verifyOtp`, {
        otp: enteredOTP,
        email: email // Pass email along with otp in the request
      });

      // Assuming response.data contains necessary information upon successful verification
      console.log(response.data);

      // Handle success, navigate to Login or appropriate screen
      navigation.navigate('Login');
      
      // Clear OTP inputs after successful verification
      setOTP(['', '', '', '', '', '']);
      otpInputRefs.current[0].focus(); // Set focus back to the first input box
    } catch (error) {
      setError('Invalid OTP. Please try again or resend OTP.');
      setShowAlert(true);
      setResendLoading(false); // Reset resend loading state
      setResendError(null); // Reset resend error
      setTimerActive(true); // Activate the timer for resend
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/users/resendOtp`, {
        email: email
      });
      // Handle successful resend
      console.log('OTP Resent Successfully');
      // Optionally, show a success message or update UI

      // Activate the timer after successful resend
      setTimerActive(true);

      // Clear OTP inputs after successful resend
      setOTP(['', '', '', '', '', '']);
      otpInputRefs.current[0].focus(); // Set focus back to the first input box
    } catch (error) {
      setResendError('Error resending OTP. Please try again.');
      setShowAlert(true);
    } finally {
      setResendLoading(false);
    }
  };

  const clearOTPInputs = () => {
    setOTP(['', '', '', '', '', '']); // Reset OTP input fields
    otpInputRefs.current[0].focus(); // Set focus back to the first input box
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOTPInputChange(index, value)}
              ref={(ref) => (otpInputRefs.current[index] = ref)} // Store reference to each TextInput
            />
          ))}
        </View>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.loginBtn]}
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonWrapper, timerActive && styles.disabledBtn]}
          onPress={handleResendOTP}
          disabled={resendLoading || timerActive}
        >
          {resendLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>
              {timerActive ? `Resend OTP (${timer < 10 ? '00:0' : '00:'}${timer})` : 'Resend OTP'}
            </Text>
          )}
        </TouchableOpacity>
        <CustomAlert
          visible={showAlert}
          message={error || resendError}
          onClose={() => setShowAlert(false)}
        />
      </View>
    </GradientBackground>
  );
};

export default OTPScreen;
