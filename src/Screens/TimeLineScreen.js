import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import ProfileScreenTopBar from '../components/ProfileScreenTopBar';
import StarRating from '../components/StarRating';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FriendProfileScreenTopBar from '../components/FriendProfileScreenTopBar';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';

const truncateText = (text) => {
  const words = text.split(' ');
  if (words.length > 2) {
    return words.slice(0, 2).join(' ');
  } else {
    return text;
  }
};

const Timeline = ({ userData, route }) => {
  const [userRatings, setUserRatings] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const friend = route?.params?.friend || null;
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar.Bar));
    navigation.navigate('BarDetails');
  };

  useEffect(() => {
    const fetchUserRatings = async () => {
      if (friend?.id) {
        try {
          const response = await axios.get(`${BASE_URL}/api/users/${friend?.id}/timeline`, {
            headers: {
              'Authorization': `Bearer ${userData?.token}`
            }
          });
          console.log('User ratings retrieved successfully:', response.data);
          setUserRatings(response.data.ratings || []);
        } catch (error) {
          console.error('Error fetching user ratings:', error);
          setUserRatings([]);
        }
      } else {
        console.error('Friend ID is not defined');
      }
    };

    fetchUserRatings();
  }, [friend, isFocused]);

  const handleGoBack = () => {
    navigation.navigate('Profile');
  };

  const renderItem = ({ item }) => {
    let photos = [];
    if (item.Bar && item.Bar.photos) {
        if (typeof item.Bar.photos === 'string') {
            try {
                photos = JSON.parse(item.Bar.photos);
      
            } catch (error) {
                console.error('Error parsing photos:', error);
                photos = [];
            }
        } else if (Array.isArray(item.Bar.photos)) {
            photos = item.Bar.photos;
         
        } else {
            console.error('Unexpected photos format:', item.Bar.photos);
        }
    }

    const photo = photos.length > 0 ? photos[0] : null;
    const imageUrl = photo
        ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U` }
        : require('../assets/images/Rectangle-1206.png'); // Fallback image

    return (
      <View style={styles.MainItemCont}>
        <View style={styles.MainCont}>
          <TouchableOpacity onPress={() => handlegotobarDetailScreen(item)} style={styles.ibsCont}>
            <View style={styles.IMGCont}>
              <Image
                source={imageUrl}
                style={styles.IMGTs} // Ensure IMGTs style matches your design
              />
            </View>
            <View style={styles.BRC}>
              <Text style={styles.BRR}  numberOfLines={1} 
        ellipsizeMode="tail" allowFontScaling={false}>{truncateText(item.Bar.name)}</Text>
              <View style={styles.star5}>
                <StarRating rating={item.rating} />
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.bigT}>{item.Bar.reviewCount}</Text>
            <Text style={styles.smallT}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <FriendProfileScreenTopBar />
      <View style={styles.MytopBarButtonRecentActivity}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.MyimageContainer}>
        <Image
          source={friend?.profileImage ? { uri: friend.profileImage } : require('../assets/images/face.png')}
          style={styles.profileImage}
        />
        <Text style={styles.imageText}>{friend?.username}</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.containerBelowText}>
          {userRatings.length > 0 ? (
            userRatings.map((rating, index) => (
              <View key={index}>
                {renderItem({ item: rating })}
              </View>
            ))
          ) : (
            <Text style={{color:"white", marginLeft:10, marginTop:20}}>No ratings found.</Text>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(Timeline);
