import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../css/styles';
import { BASE_URL } from '@env';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

const FriendFollowingScreen = ({ navigation, userData, route }) => {
  const [following, setFollowing] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const { friend } = route.params || {};
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
          setFollowing(friendResponse.data.following || []);
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
      } finally {
        setLoading(false);
      }
    };

    if (userData?.token && isFocused) {
      fetchData();
    }
  }, [friend, userData, isFocused]);

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
              <Text style={styles.Rectatext}>Following</Text>
            </View>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            following.map((user, index) => (
              <View key={`${user.id}-${index}`} style={styles.myfollowcontainer}>
                <TouchableOpacity onPress={() => handleUserSelect(user)} style={styles.imgusercontainer}>
                  <Image
                    source={{ uri: user.profileImage || 'https://via.placeholder.com/150' }}
                    style={styles.myuserimg}
                  />
                  <Text style={styles.RBT}> {user.username}</Text>
                </TouchableOpacity>
                {user.id !== userData?.user?.id && (
                  <TouchableOpacity onPress={() => handleFollowAction(user.id)}>
                    <Text style={styles.RBTunfollow}>
                      {isFollowing(user.id) ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

FriendFollowingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(FriendFollowingScreen);
