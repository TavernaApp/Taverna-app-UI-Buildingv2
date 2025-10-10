import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BASE_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

import styles from '../css/styles'; // Import your styles

const FollowScreen = ({ navigation, userData, dispatch }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused

  useEffect(() => {
    if (userData?.token && isFocused) {
      fetchData();
    }
  }, [userData, isFocused]);

  const fetchData = async () => {
    try {
      if (!userData?.token) {
        throw new Error('User token not available');
      }

      const response = await axios.get(
        `${BASE_URL}/api/users/getfollowerandfollowing/${userData?.user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );

      if (response.data) {
        setFollowers(response.data.followers || []);
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
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('My Profile');
  };

  const handleUserSelect = (friend) => {
    navigation.navigate('Profile', { friend });
  };

  const handleFollowAction = async (userId) => {
    try {
      const isFollowing = following.some(f => f.id === userId);

      if (!isFollowing) {
        await axios.post(`${BASE_URL}/api/users/follow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${userData?.token}` }
        });
        setFollowing(prevFollowing => [...prevFollowing, { id: userId }]);
      } else {
        await axios.delete(`${BASE_URL}/api/users/unfollow/${userId}`, {
          headers: { Authorization: `Bearer ${userData?.token}` }
        });
        setFollowing(prevFollowing => prevFollowing.filter(f => f.id !== userId));
      }

      // Update followers and following lists after follow/unfollow action
      fetchData();
    } catch (error) {
      console.error('Follow/Unfollow Error:', error);
      Alert.alert('Error', 'An error occurred while performing the action. Please try again.');
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
      end={{ x: 0, y: 0 }}
    >
      <ScrollView>
        <View style={styles.Incontainer}>
          <View style={styles.contieses}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
                <Icon name="chevron-left" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.Rectatext}>Followers</Text>
            </View>
          </View>
          {followers.map((user) => (
            <View key={user.id} style={styles.myfollowcontainer}>
              <TouchableOpacity onPress={() => handleUserSelect(user)} style={styles.imgusercontainer}>
                <Image
                  source={ user.profileImage ? { uri:  user.profileImage } : require('../assets/images/face.png')}
                  style={styles.myuserimg}
                />
                <Text style={styles.RBT}>{user.username}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFollowAction(user.id)}>
                <Text style={styles.RBTunfollow}>
                  {following.some(f => f.id === user.id) ? 'Following' : 'Follow Back'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

FollowScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(FollowScreen);