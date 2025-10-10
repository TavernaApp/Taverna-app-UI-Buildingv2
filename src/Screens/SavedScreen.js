import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, FlatList, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from '../css/styles'; // Assuming you have defined your styles in a separate file
import FallbackImage from '../assets/images/Rectangle-1206.png';
import StarRatingCenter from '../components/StarRatingCenter';
import { BASE_URL } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';
import { useIsFocused } from '@react-navigation/native';
import FriendProfileScreenTopBar from '../components/FriendProfileScreenTopBar';
import StarRating from '../components/StarRating';

const SavedScreen = ({ navigation, userData, route }) => {
  const [savedBars, setSavedBars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const friend = route?.params?.friend || null;

  // Define fetchSavedBars function
  const fetchSavedBars = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${friend?.id}/saved-bars`);
      const bars = response.data.map(item => item.Bar).filter(bar => bar !== null);
      console.log('Fetched saved bars:', bars);
      setSavedBars(bars);
    } catch (error) {
      console.error('Error fetching saved bars:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    console.log('Inside useEffect, isFocused:', isFocused);
    console.log('Friend:', friend);

    if (isFocused && friend?.id) {
      console.log('Fetching saved bars...');
      fetchSavedBars();
    }
  }, [isFocused, friend?.id]);

  const handlegotobarDetailScreen = (bar) => {
    console.log('Navigating to SavedBarDetails for bar:', bar);
    dispatch(setSelectedBar(bar));
    navigation.navigate('BarDetails');
  };

  const handleGoBack = () => {
    console.log('Navigating back to My Profile');
    navigation.navigate('My Profile');
  };

  const renderItem = ({ item }) => {
    let photos = [];
    if (item.photos) {
      // Check if item.photos is a string
      if (typeof item.photos === 'string') {
        try {
          photos = JSON.parse(item.photos);
        } catch (error) {
          console.error('Error parsing photos:', error);
        }
      } else {
        // Assume it's already an array if not a string
        photos = item.photos;
      }
    }

    const photo = photos.length > 0 ? photos[0] : null;
    const imageUrl = photo
      ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U` }
      : FallbackImage;

    // Ensure averagePriceTier is safely defined
    const averagePriceTier = item.averagePriceTier || 0; // Default to 0 if not defined

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
            <StarRatingCenter rating={item.user_ratings_total / 100} />
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchSavedBars(); // Call fetchSavedBars directly
  }, []);

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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#fff']} // Customize the refresh indicator colors
            tintColor={'#fff'} // Customize the refresh indicator color
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.containerBelowText]}>
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
  userData: state.user.userData,
});

export default connect(mapStateToProps)(SavedScreen);
