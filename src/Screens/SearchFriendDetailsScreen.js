import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles';
import StarRating from '../components/StarRating';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@env';
import { ScrollView } from 'react-native-gesture-handler';

const SearchFriendDetailsScreen = ({ route, userData }) => {
  const [following, setFollowing] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const { friend } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockText, setBlockText] = useState('');

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setReportModalVisible(false);
    setBlockModalVisible(false);
  };

  const handleBlock = () => {
    setBlockModalVisible(true);
  };

  const handleReport = () => {
    setReportModalVisible(true);
  };

  const handleBlockConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}/api/block/${friend?.id}`,
        {
          reason: blockText
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      Alert.alert('Success', 'Block submitted successfully!');
      setBlockText('');
      handleCloseModal();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit block. Please try again later.');
    }
  };

  const handleReportConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}/api/report/${friend?.id}`,
        {
          reason: reportText
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`
          }
        }
      );
      Alert.alert('Success', 'Report submitted successfully!');
      setReportText('');
      handleCloseModal();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [followerResponse, followingResponse] = await Promise.all([
          axios.get(`${BASE_URL}/api/users/getfollowercount/${friend?.id}`, {
            headers: {
              'Authorization': `Bearer ${userData?.token}`
            }
          }),
          axios.get(`${BASE_URL}/api/users/getfollowingcount/${friend?.id}`, {
            headers: {
              'Authorization': `Bearer ${userData?.token}`
            }
          })
        ]);
        setFollowerCount(followerResponse.data.followerCount);
        setFollowingCount(followingResponse.data.followingCount);
      } catch (error) {
        // Endpoints not implemented yet - set default values
        setFollowerCount(0);
        setFollowingCount(0);
      }
    };

    fetchCounts();
  }, [friend, userData]);

  const navigation = useNavigation();
  const data = [
    { id: 1, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'), price: "566$$" },
    { id: 2, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'), price: "566$$" },
    { id: 3, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'), price: "566$$" },
    { id: 4, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'), price: "566$$" },
  ];

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
        }

        if (currentUserResponse.data) {
          setCurrentUserFollowing(currentUserResponse.data.following || []);
        }
      } catch (error) {
        // Endpoints not implemented yet - set default values
        setFollowing([]);
        setCurrentUserFollowing([]);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.token) {
      fetchData();
    }
  }, [friend, userData]);

  const handleGoBack = () => {
    navigation.navigate('My Friends');
  };

  const handleShowFollowers = () => {
    navigation.navigate('FriendFollow', { friend: friend });
  };

  const handleShowFollowing = () => {
    navigation.navigate('FriendFollowing', { friend: friend });
  };

  const isFollowing = (userId) => {
    return currentUserFollowing.some(friend => friend?.id === userId);
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
        setFollowerCount(prevCount => prevCount + 1); // Increase follower count
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
        setFollowerCount(prevCount => prevCount - 1); // Decrease follower count
      }
    } catch (error) {
      console.error('Follow/Unfollow Error:', error);
      console.log('Request URL:', error.config.url);
      console.log('Request Data:', error.config.data);
      console.log('Response Data:', error.response.data);
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', error.response.headers);

      if (error.response.status === 400 && error.response.data.message === "You are already following this user") {
        Alert.alert('Already Following', 'You are already following this user.');
      } else {
        Alert.alert('Error', 'An error occurred while performing the action. Please try again.');
      }
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.containerRecentActivity}>
        <View style={styles.imageRecentActivity}>
          <Image source={item.image} style={styles.imageResizeRecentActivity} />
        </View>
        <Text style={styles.nameRecentActivity}>{item.name}</Text>
        <StarRating rating={item.rating} />
        {/* <Text style={styles.priceRecentActivity}>{item.price}</Text> */}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE', '#7A4BAB']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.FlatListRecentActivity}>
        <View style={styles.topBarActivity}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text>
              <Icon name="chevron-left" size={18} color="white" />
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.topBarButtonTextRecentActivity}>My Friends</Text>
          </View>
          <TouchableOpacity onPress={handleModal}>
            <Icon name="ellipsis-h" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.MyimageFreindContainer}>
        <Image source={require('../assets/images/face.png')} style={styles.profileImage} />
        <Text style={styles.imageText}>{friend.username}</Text>
      </View>
      {friend.id !== userData?.user?.id && (
        <TouchableOpacity style={styles.FreindFreindfollowButton} onPress={() => handleFollowAction(friend.id)}>
          <Text style={styles.RBTunfollow}>
            {isFollowing(friend.id) ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.Freindfollowscontainer}>
        <TouchableOpacity style={styles.FreindfollowsButton} onPress={handleShowFollowers}>
          <Text style={styles.followButtonText}>{followerCount}</Text>
          <Text style={styles.followButtonText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.FreindfollowingButton} onPress={handleShowFollowing}>
          <Text style={styles.followButtonText}>{followingCount}</Text>
          <Text style={styles.followButtonText}>Following</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerMyFriends}>
        <View style={{ alignItems: 'center' }}>
          <Image source={friend.image} style={styles.imageFriendScreen} resizeMode="cover" />
          <Text style={{ fontFamily: 'Roboto', fontSize: 15, fontWeight: '700', color: 'white' }}>4 Bar</Text>
        </View>
        <View style={{ height: 1, backgroundColor: 'white', marginBottom: 10, marginTop: 20 }} />
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => renderItem({ item, index, dataLength: data.length })}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.contentContainerStyleRecentActivity}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleBlock} style={styles.modalButtons}>
              <Text style={styles.modalButtonsText}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReport} style={styles.modalButtons}>
              <Text style={styles.modalButtonsText}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButtons}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', padding: '2%', fontWeight: '700' }}>Why are you reporting this account?</Text>
            <TextInput
              style={styles.reportinput}
              placeholder="Enter your reason"
              value={reportText}
              placeholderTextColor="#7440AE"
              onChangeText={text => setReportText(text)}
            />
            <TouchableOpacity onPress={handleReportConfirm} style={styles.modalButtons}>
              <Text style={styles.modalButtonText}>Submit Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButtons}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={blockModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: 'center', padding: '2%', fontWeight: '700' }}>Why are you blocking this account?</Text>
            <TextInput
              style={styles.reportinput}
              placeholder="Enter your reason"
              value={blockText}
              placeholderTextColor="#7440AE"
              onChangeText={text => setBlockText(text)}
            />
            <TouchableOpacity onPress={handleBlockConfirm} style={styles.modalButtons}>
              <Text style={styles.modalButtonText}>Submit Block</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButtons}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

export default connect(mapStateToProps)(SearchFriendDetailsScreen);
