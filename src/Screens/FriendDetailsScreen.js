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
import FriendProfileScreenTopBar from '../components/FriendProfileScreenTopBar';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';

const useFetchCounts = (friendId, token) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [followerResponse, followingResponse] = await Promise.all([
          axios.get(`${BASE_URL}/api/users/getfollowercount/${friendId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/users/getfollowingcount/${friendId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setFollowerCount(followerResponse.data.followerCount);
        setFollowingCount(followingResponse.data.followingCount);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [friendId, token]);

  return { followerCount, setFollowerCount, followingCount };
};

const useFetchFollowData = (friendId, userId, token) => {
  const [following, setFollowing] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [friendResponse, currentUserResponse] = await Promise.all([
          axios.get(`${BASE_URL}/api/users/getfollowerandfollowing/${friendId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/users/getfollowerandfollowing/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setFollowing(friendResponse.data.following || []);
        setCurrentUserFollowing(currentUserResponse.data.following || []);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [friendId, userId, token]);

  return { following, currentUserFollowing, loading, setCurrentUserFollowing };
};

const useFetchRatings = (friendId) => {
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(true);
  const [ratingsError, setRatingsError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setRatingsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/ratings/${friendId}`);
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setRatingsError('Failed to fetch ratings. Please try again later.');
      } finally {
        setRatingsLoading(false);
      }
    };

    fetchRatings();
  }, [friendId]);

  return { ratings, ratingsLoading, ratingsError };
};

const ModalComponent = ({ visible, onClose, onConfirm, title, placeholder, value, onChangeText }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={{ textAlign: 'center', padding: '2%', fontWeight: '700' }}>{title}</Text>
        <TextInput
          style={styles.reportinput}
          placeholder={placeholder}
          value={value}
          placeholderTextColor="#7440AE"
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onConfirm} style={styles.modalButtons}>
          <Text style={styles.modalButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.modalButtons}>
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const ProfIleScreen = ({ route, userData }) => {
  const { friend } = route.params;
  const { followerCount, setFollowerCount, followingCount } = useFetchCounts(friend.id, userData?.token);
  const { following, currentUserFollowing, loading, setCurrentUserFollowing } = useFetchFollowData(friend.id, userData?.user?.id, userData?.token);
  const { ratings, ratingsLoading, ratingsError } = useFetchRatings(friend.id);

  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportText, setReportText] = useState('');
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockText, setBlockText] = useState('');
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();
  
  const navigation = useNavigation();

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar.Bar));
    navigation.navigate('BarDetails');
  };

  const handleModal = () => setModalVisible(true);
  const handleCloseModal = () => {
    setModalVisible(false);
    setReportModalVisible(false);
    setBlockModalVisible(false);
  };
  const handleBlock = () => setBlockModalVisible(true);
  const handleReport = () => setReportModalVisible(true);

  const handleBlockConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}/api/block/${friend?.id}`, { reason: blockText }, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      Alert.alert('Success', 'Block submitted successfully!');
      setBlockText('');
      handleCloseModal();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit block. Please try again later.');
    }
  };

  const handleReportConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}/api/report/${friend?.id}`, { reason: reportText }, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      Alert.alert('Success', 'Report submitted successfully!');
      setReportText('');
      handleCloseModal();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again later.');
    }
  };

  const handleGoBack = () => navigation.navigate('My Friends');
  const handleShowFollowers = () => navigation.navigate('FriendFollow', { friend });
  const handleShowFollowing = () => navigation.navigate('FriendFollowing', { friend });

  const isFollowing = (userId) => currentUserFollowing.some(friend => friend?.id === userId);

  const handleFollowAction = async (userId) => {
    try {
      if (!isFollowing(userId)) {
        await axios.post(`${BASE_URL}/api/users/follow/${userId}`, {}, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });
        setCurrentUserFollowing([...currentUserFollowing, { id: userId }]);
        setFollowerCount(prevCount => prevCount + 1); // Update follower count
      } else {
        await axios.delete(`${BASE_URL}/api/users/unfollow/${userId}`, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });
        setCurrentUserFollowing(currentUserFollowing.filter(user => user.id !== userId));
        setFollowerCount(prevCount => prevCount - 1); // Update follower count
      }
    } catch (error) {
      console.error('Follow/Unfollow Error:', error);
      Alert.alert('Error', 'An error occurred while performing the action. Please try again.');
    }
  };

  const getPhotoUrl = (photoReference) => {
    const apiKey = 'AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U'; // Replace with your Google Places API key
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  const renderItem = ({ item }) => {
    const barNameWords = item.Bar.name.split(' ');
    const shortenedName = barNameWords.slice(0, 2).join(' ');

    // Determine the rating to display
    const displayRating = item.rating || 2; // Default to 2 if item.rating is falsy
    const bar = item;
    let photoUrl = 'fallback_image_url'; // Replace with your valid fallback image URL

    try {
        console.log(bar.Bar.photos, "testing item");

        if (bar.Bar.photos) {
            let photos;
            // Check if bar.Bar.photos is a string
            if (typeof bar.Bar.photos === 'string') {
                // Attempt to parse the JSON string
                photos = JSON.parse(bar.Bar.photos);
            } else {
                // If it's not a string, assume it's already an array
                photos = bar.Bar.photos;
            }

            if (Array.isArray(photos) && photos.length > 0) {
                const photoReference = photos[0].photo_reference;
                photoUrl = getPhotoUrl(photoReference);
            }
        }
    } catch (error) {
        console.error('Error parsing photos:', error);
    }

    // If photoUrl is still the fallback image URL, update it to your fallback image path
    if (photoUrl === 'fallback_image_url') {
        photoUrl = require('../assets/images/Rectangle-1206.png'); // Assuming Rectangle-1206.png is in your assets folder
    }

    return (
      <TouchableOpacity onPress={() => handlegotobarDetailScreen(item)}>
        <View style={styles.itemContainerMyCarouselSlider}>
          <Image
            source={typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl}
            style={styles.MyimageCarouselSlider}
            resizeMode="cover"
          />
          <View style={styles.textContainerMyCarouselSlider}>
            <Text style={styles.movieNameMyCarouselSlider}>{shortenedName}</Text>
            <StarRating rating={displayRating} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const friendFollowsCurrentUser = following.some(user => user.id === userData?.user?.id);

  return (
    <View  style={{ flex: 1 ,backgroundColor:"#2A0955", }} >
      <FriendProfileScreenTopBar />
      <View>
        <View style={styles.topBarActivity}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="chevron-left" size={18} color="white" />
          </TouchableOpacity><Text style={[styles.topBarButtonTextRecentActivity, { marginBottom: 10 }]}>
  My Friends
</Text>
     <TouchableOpacity onPress={handleModal}>
            <Icon name="ellipsis-h" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.MyimageFreindContainer}>
        <Image
          source={friend.profileImage ? { uri: friend.profileImage } : require('../assets/images/face.png')}
          style={styles.profileImage}
        />
        <Text style={styles.imageText}>{friend.username}</Text>
      </View>
      {friend.id !== userData?.user?.id && (
        <TouchableOpacity style={styles.FreindFreindfollowButton} onPress={() => handleFollowAction(friend.id)}>
          <Text style={styles.RBTunfollow}>
            {isFollowing(friend.id) ? 'Following' : friendFollowsCurrentUser ? 'Follow Back' : 'Follow'}
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
      <View style={{ height: 1, backgroundColor: 'white', marginBottom: 10, marginTop: 20 }} />
      <View style={styles.containerMyFriends}>
        <FlatList
          data={ratings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.contentContainerStyleRecentActivity}
          ListEmptyComponent={<Text style={{ color: 'white', textAlign: 'center' }}>No ratings available</Text>}
        />
      </View>
      <ModalComponent
        visible={blockModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleBlockConfirm}
        title="Why are you blocking this account?"
        placeholder="Enter your reason"
        value={blockText}
        onChangeText={setBlockText}
      />
      <ModalComponent
        visible={reportModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleReportConfirm}
        title="Why are you reporting this account?"
        placeholder="Enter your reason"
        value={reportText}
        onChangeText={setReportText}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(ProfIleScreen);
