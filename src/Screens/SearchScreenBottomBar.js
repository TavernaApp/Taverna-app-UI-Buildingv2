import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from '../css/styles'; // Ensure styles are imported correctly
import { BASE_URL } from '@env'; // Correct import for the base URL


const SearchScreenBottomBar = ({ navigation, userData }) => {
  const [text, setText] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`
        }
      });
      // Filter out the current user
      const users = response.data.filter(user => user.id !== userData?.user?.id);
      setAllUsers(users);
      setFilteredUsers(users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      // Show empty list instead of error
      setAllUsers([]);
      setFilteredUsers([]);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleUserSelect = (friend) => {
    navigation.navigate('SearchFriendDetailsScreen', { friend });
  };

  useEffect(() => {
    if (text.trim() === '') {
      setFilteredUsers(allUsers); // Show all users if search is empty
    } else {
      // Filter users by username or email
      const filtered = allUsers.filter(user =>
        user.username?.toLowerCase().includes(text.toLowerCase()) ||
        user.email?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [text, allUsers]);

  if (loading) {
    return (
      <LinearGradient
        colors={['#312537', '#7440AE']}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <ScrollView>
        <View style={styles.Incontainer}>
          <View style={styles.conties}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.CancelBT}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Finduserbox}>
              <Text style={styles.FinduserText}>Find User</Text>
            </View>
          </View>

          <View style={styles.Findusercontainer}>
            <TextInput
              style={styles.Findinput}
              onChangeText={setText}
              value={text}
              placeholder="  Search"
              placeholderTextColor="white"
              placeholderStyle={{ fontWeight: '700' }}
            />

            <Text style={styles.findtext}>Search Results</Text>

            {filteredUsers.map((user, index) => (
              <TouchableOpacity key={index} style={styles.myfindusercontainer} onPress={() => handleUserSelect(user)}>
                <View style={styles.imgusercontainer}>
                  { user.profileImage ? (
                    <Image source={{ uri:  user.profileImage }} style={styles.myuserimg} />
                  ) : (
                    <Image source={require('../assets/images/face.png')} style={styles.myuserimg} />
                  )}
                  <Text style={styles.RBT}> {user.username}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

export default connect(mapStateToProps)(SearchScreenBottomBar);
