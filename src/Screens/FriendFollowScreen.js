import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../css/styles';
import { BASE_URL } from '@env';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused

const FriendFollowScreen = ({ navigation, userData, route }) => {
  const [followers, setFollowers] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const { friend } = route.params || {};
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendResponse, currentUserResponse] = await Promise.all([
          axios.get(
            `${BASE_URL}/api/users/getfollowerandfollowing/${friend?.id}`,
            {
              headers: {
                Authorization: `Bearer ${userData?.token}`
              }
            }
          ),
          axios.get(
            `${BASE_URL}/api/users/getfollowerandfollowing/${userData?.user?.id}`,
            {
              headers: {
                Authorization: `Bearer ${userData?.token}`
              }
            }
          )
        ]);

        if (friendResponse.data) {
          setFollowers(friendResponse.data.followers || []);
        } else {
          handleUnexpectedResponseError('friendResponse');
        }

        if (currentUserResponse.data) {
          setCurrentUserFollowing(currentUserResponse.data.following || []);
        } else {
          handleUnexpectedResponseError('currentUserResponse');
        }
      } catch (error) {
        handleFetchDataError(error);
      }
    };

    if (userData?.token && isFocused) {
      fetchData();
    }
  }, [friend, userData, isFocused]);

  const handleUnexpectedResponseError = (responseName) => {
    console.error('Unexpected response structure for', responseName);
    Alert.alert('Error', 'Unexpected response structure');
  };

  const handleFetchDataError = (error) => {
    console.error('Error fetching user data:', error);
    Alert.alert('Error', 'Failed to fetch user data. Please check your connection and try again.');
  };

  const handleGoBack = () => {
    navigation.navigate('Profile', { friend });
  };

  const handleUserSelect = (friend) => {
    navigation.navigate('Profile', { friend });
  };

  const isFollowing = (userId) => {
    return currentUserFollowing.some(user => user.id === userId);
  };

  const handleFollowAction = async (userId) => {
    try {
      if (!isFollowing(userId)) {
        await axios.post(
          `${BASE_URL}/api/users/follow/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`
            }
          }
        );
        setCurrentUserFollowing([...currentUserFollowing, { id: userId }]);
      } else {
        await axios.delete(
          `${BASE_URL}/api/users/unfollow/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`
            }
          }
        );
        setCurrentUserFollowing(currentUserFollowing.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

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
            <View>
              <Text style={styles.Rectatext}>Followers</Text>
            </View>
          </View>
          {followers.map((user, index) => (
            <View key={index} style={styles.myfollowcontainer}>
              <TouchableOpacity onPress={() => handleUserSelect(user)} style={styles.imgusercontainer}>
                <Image
                  source={{ uri: user.profileImage || 'https://via.placeholder.com/150' }}
                  style={styles.myuserimg}
                />
                <Text style={styles.RBT}> {user.username}</Text>
              </TouchableOpacity>
              {user.id !== userData?.user?.id && (
                <TouchableOpacity onPress={() => handleFollowAction(user.id)}>
                  <Text style={styles.followButtonText}>
                    {isFollowing(user.id) ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

FriendFollowScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(FriendFollowScreen);
