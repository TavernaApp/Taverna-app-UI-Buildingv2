import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, FlatList, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from '../css/styles';
import ProfileScreenTopBar from '../components/ProfileScreenTopBar';
import FallbackImage from '../assets/images/Rectangle-1206.png'; // Import the local image
import StarRating from '../components/StarRating';
import { BASE_URL } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';
import { useIsFocused } from '@react-navigation/native';

const MySaved = ({ navigation, userData }) => {
  const [profileImage, setProfileImage] = useState("");
  const isFocused = useIsFocused();
  const [savedBars, setSavedBars] = useState([]);
  const dispatch = useDispatch();
  
  const username = userData?.user?.username;

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userData?.user?.id}/profile`, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        setProfileImage(response?.data?.profileImage);
      } catch (error) {
        // Profile fetch failed - use default image
        setProfileImage("");
      }
    };

    if (isFocused) {
      fetchProfileImage();
    }
  }, [isFocused]);

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('SavedBarDetails');
  };

  useEffect(() => {
    const fetchSavedBars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userData?.user?.id}/saved-bars`, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        const bars = response.data.map(item => item.Bar).filter(bar => bar !== null);
        setSavedBars(bars);
      } catch (error) {
        // Endpoint failed - show empty list
        setSavedBars([]);
      }
    };

    fetchSavedBars();
  }, [userData]);

  const handleGoBack = () => {
    navigation.navigate('My Profile');
  };

  const renderItem = ({ item }) => {
    let photos = [];
    if (item.photos) {
      if (typeof item.photos === 'string') {
        try {
          photos = JSON.parse(item.photos);
        } catch (error) {
          console.error('Error parsing photos:', error);
          photos = [];
        }
      } else if (Array.isArray(item.photos)) {
        photos = item.photos;
      } else {
        console.error('Unexpected photos format:', item.photos);
      }
    }

    const photo = photos.length > 0 ? photos[0] : null;
    const imageUrl = photo
      ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U` }
      : FallbackImage;

    const averagePriceTier = item.averagePriceTier || 0; // Ensure averagePriceTier is defined

    return (
      <TouchableOpacity onPress={() => handlegotobarDetailScreen(item)}>  
        <View style={styles.itemContainerMyCarouselSlider}>
          <Image
            source={imageUrl}
            style={styles.MyimageCarouselSlider}
            resizeMode="cover"
          />
          <View style={styles.textContainerMyCarouselSlider}>
            <Text style={styles.movieNameMyCarouselSlider} numberOfLines={1}>{item.name}</Text>
            <View style={styles.iconsSetting}>
              <StarRating rating={item.averageRating || 3.5} />
              <Text style={styles.separator}>|| </Text>
              {[...Array(3)].map((_, index) => (
                <Icon
                  key={index}
                  name="dollar"
                  size={15}
                  color={index < averagePriceTier ? 'white' : 'gray'} // Use the averagePriceTier value safely
                  style={styles.icon}
                />
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const numColumns = 4;

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <ProfileScreenTopBar />
      <View style={styles.MytopBarButtonRecentActivity}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.MyimageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/images/face.png')}
          style={styles.profileImage}
        />
        <Text style={styles.imageText}>{username}</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.containerBelowText,]}>
          <View style={styles.savecontainer}>
            <FlatList
              data={savedBars}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              key={`_${numColumns}`}
              contentContainerStyle={styles.MycarouselContentContainer}
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

export default connect(mapStateToProps)(MySaved);
