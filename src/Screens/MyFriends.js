import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import { BASE_URL } from '@env'; // Correct import for the base URL
import TopBarMap from '../components/TopBarMap';
import styles from '../css/styles';
import defaultProfileImage from '../assets/images/friend.jpg'; // Default profile image

const MyFriendsScreen = ({ userData }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error message
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  useEffect(() => {
    if (userData?.token && isFocused) { // Fetch data only when the screen is focused
      fetchData();
    }
  }, [userData, isFocused]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/getuserprofilewithfirend/${userData?.user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}` // Include the token in the request header
          }
        }
      );

      // Set followers and following state
      if (response.data) {
        setFollowers(response.data.friends || []);
        setFollowing(response.data.following || []);
      } else {
        setFollowers([]);
        setFollowing([]);
      }
    } catch (error) {
      // Endpoint not implemented yet - show empty list
      setFollowers([]);
      setFollowing([]);
      setError(null);
    } finally {
      setLoading(false); // Set loading to false after data fetching completes
      setRefreshing(false); // Set refreshing to false after data fetching completes
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Map');
  };

  const handleSeeMore = (friend) => {
    // Navigate to the desired screen, passing friend data if needed
    navigation.navigate('Profile', { friend, following });
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when refreshing starts
    fetchData(); // Fetch data again on pull-to-refresh
  };

  return (
    <View style={{backgroundColor:"#2A0955", flex:1}}
    >
      <TopBarMap />
      <View style={styles.FlatListRecentActivity}>
        <View style={styles.topBarButtonRecentActivity}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.imageBackArrowRecentActivity}>
              <Icon name="chevron-left" size={18} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGoBack}
            style={styles.topBarButtonAlignmentRecentActivity}>
            <Text style={styles.topBarButtonTextRecentActivity}>
              My Friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.containerMyFriends}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <Text style={{color: 'white', textAlign: 'center', marginTop: 20}}>Loading...</Text>
        ) : [...followers, ...following].length === 0 ? (
          <Text style={{color: 'white', textAlign: 'center', marginTop: 20}}>No friends found.</Text>
        ) : (
          [...followers, ...following].map((friend, index) => (
          <View key={friend.id}>
            <View style={styles.childrenMyFriends}>
              <Image 
                source={friend.profileImage ? { uri: friend.profileImage } : defaultProfileImage}
                style={{ width: 100, height: 100, borderRadius: 25 }}
                accessibilityLabel="Profile Picture"
              />
              <Text style={styles.TextMyFriends}>{friend.username}</Text>
              <TouchableOpacity 
                style={styles.seeMoreContainerMyFreinds}
                onPress={() => handleSeeMore(friend)}
              >
                <Text style={styles.seeMoreText}>See More</Text>
                <Icon name="arrow-right" size={18} color="white" style={styles.arrowIconMyFriends} />
              </TouchableOpacity>
            </View>
            {/* Render horizontal line if the friend is not the last one */}
            {index !== followers.length + following.length - 1 && <View style={styles.horizontalLineMyFriends}></View>}
          </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

// Define mapStateToProps function to map user data from Redux state to props
const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

export default connect(mapStateToProps)(MyFriendsScreen); // Connect MyFriendsScreen to Redux store
