import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import styles from '../css/styles'; 
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Popup from '../components/CustomPopup';
import { BASE_URL } from '@env'; 
import { connect } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash.debounce';

const BlockedListScreen = ({ navigation, userData }) => {
  const [text, setText] = useState('');
  const [isBlockPopupVisible, setBlockPopupVisible] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchBlockedUsers = async (query = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/blocked-users`, {
        params: { username: query },
        headers: {
          'Authorization': `Bearer ${userData?.token}`,
        },
      });
      setBlockedUsers(Array.isArray(response.data.blockedUsers) ? response.data.blockedUsers : []);
    } catch (error) {
      console.error('Failed to fetch blocked users:', error);
      setBlockedUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, [userData?.token]);

  const debouncedFetchBlockedUsers = useCallback(debounce(fetchBlockedUsers, 500), []);

  const handleSearchChange = (text) => {
    setText(text);
    debouncedFetchBlockedUsers(text);
  };

  const openBlockPopup = (userId) => {
    setSelectedUserId(userId);
    setBlockPopupVisible(true);
  };

  const closeBlockPopup = () => {
    setBlockPopupVisible(false);
    setSelectedUserId(null);
  };

  const handleGoBack = () => {
    navigation.navigate('Setting');
  };

  const handleUnblockUser = async () => {
    if (!selectedUserId) return;
    try {
      await axios.delete(`${BASE_URL}/api/unblock/${selectedUserId}`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`,
        },
      });
      setBlockedUsers(blockedUsers.filter(user => user.id !== selectedUserId));
      closeBlockPopup();
    } catch (error) {
      console.error('Failed to unblock user:', error.response || error.message || error);
      Alert.alert('Error', 'Failed to unblock user. Please try again later.');
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
          <View style={styles.conties}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.CancelBT}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Finduserbox}>
              <Text style={styles.FinduserText}>Blocked List</Text>
            </View>
          </View>

          <View style={styles.Findusercontainer}>
            <TextInput
              style={styles.Findinput}
              onChangeText={handleSearchChange}
              value={text}
              placeholder="Search"
              placeholderTextColor="white"
              placeholderStyle={{ fontWeight: '700' }}
            />

            <Text style={styles.findtext}>Recent</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              blockedUsers.length > 0 ? (
                blockedUsers.map(user => (
                  <TouchableOpacity key={user.id} style={styles.myfindusercontainer} onPress={() => openBlockPopup(user.id)}>
                    <View style={styles.imgusercontainer}>
                      <Image
                        source={require('../assets/images/face.png')}
                        style={styles.myuserimg}
                      />
                      <Text style={styles.RBT}> @{user.username}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{textAlign:'center', padding:'2%'}}>No blocked users found.</Text>
              )
            )}
            <Popup
              visible={isBlockPopupVisible}
              onClose={closeBlockPopup}
              onConfirm={handleUnblockUser}
              message="Are you sure you want to unblock this account?"
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData
});

export default connect(mapStateToProps)(BlockedListScreen);
