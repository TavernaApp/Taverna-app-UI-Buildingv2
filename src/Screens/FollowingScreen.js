import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { BASE_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const FollowingScreen = ({ navigation, userData }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused

  // Fetch followers and following data when the component is focused
  useEffect(() => {
    if (userData?.token && isFocused) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/users/getfollowerandfollowing/${userData?.user?.id}`,
            {
              headers: {
                Authorization: `Bearer ${userData?.token}` // Include the token in the request header
              }
            }
          );

          // Set followers and following state
          if (response.data) {
            setFollowing(response.data.following || []);
          } else {
            console.error('Unexpected response structure', response.data);
            Alert.alert('Error', 'Unexpected response structure');
          }
        } catch (error) {
          console.error('There was an error fetching the user data!', error);
          Alert.alert(
            'Error',
            'There was an error fetching the user data! Please check your token and try again.'
          );
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      };

      fetchData();
    }
  }, [userData, isFocused]);

  // Handle navigation back to the previous screen
  const handleGoBack = () => {
    navigation.navigate('My Profile'); 
  };

  const handleUserSelect = (friend) => {
    navigation.navigate('Profile', { friend });
  };

  // Handle unfollowing a user
  const handleGoUnfollow = async (userId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/users/unfollow/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      // Assuming you want to update the list of following after unfollowing
      setFollowing((prevFollowing) => prevFollowing.filter((user) => user.id !== userId));

      // Check if the response is received and handle it
      if (response && response.data) {
        console.log('Unfollow response:', response.data); // Or handle it as required
      } else {
        console.error('Empty response received after unfollowing user.');
        // Handle empty response as per your application logic
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
      Alert.alert('Error', 'There was an error unfollowing the user. Please try again later.');
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />;
  }

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <ScrollView>
        <View style={styles.Incontainer}>
            <View style={styles.contieses}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
              <Icon name="chevron-left" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View >
            <Text style={styles.Rectatext}>Following</Text>
          </View>
          </View>
          {following.map((user) => (
            <View key={user.id} style={styles.myfollowcontainer}>
              <TouchableOpacity onPress={() => handleUserSelect(user)} style={styles.imgusercontainer}>
                <Image
                  source={{ uri: user.profileImage || 'https://via.placeholder.com/150' }} // Use user profile image if available
                  style={styles.myuserimg}
                />
                <Text style={styles.RBT}> {user.username}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGoUnfollow(user.id)}>
                <Text style={styles.RBTunfollow}>Following</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

FollowingScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // Ensure navigation prop is provided
  userData: PropTypes.object.isRequired, // Ensure userData prop is provided
};

// Mapping state to props to access user data from Redux store
const mapStateToProps = (state) => ({
  userData: state.user.userData
});

// Connecting component to Redux store
export default connect(mapStateToProps)(FollowingScreen);
