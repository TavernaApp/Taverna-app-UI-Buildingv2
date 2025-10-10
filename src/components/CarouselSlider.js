import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native'; // Import necessary hooks
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles';
import { connect, useSelector, useDispatch } from 'react-redux';
import StarRating from './StarRating';
import { BASE_URL } from '@env';
import { setSelectedBar } from '../reducers/anotherReducer';
import { clearUserData } from '../actions';
import Geolocation from '@react-native-community/geolocation';
const CarouselSlider = ({ userData, refreshing, onRefresh }) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [recentVisits, setRecentVisits] = useState([]);
  const dispatch = useDispatch();
  const selectedBar = useSelector(state => state.another.selectedBar); 
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [region, setRegion] = useState(null);
  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({ latitude, longitude });
      },
      error => {
        console.error('Error fetching user location:', error);
      }
    );
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = R * c; // Distance in km
    const distanceInMiles = distanceInKm * 0.621371; // Convert to miles
  
    return distanceInMiles; // Return distance in miles
  };
  // Function to fetch recent visits
  const fetchRecentVisits = async () => {
    if (!userData?.token) return;

    try {
      const response = await axios.get(`${BASE_URL}/api/users/me/recent-visits`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setRecentVisits(response.data);
    } catch (error) {
      console.error('Error fetching recent visits:', error);
      if (error.response && error.response.status === 401) {
        dispatch(clearUserData());
        navigation.navigate('Login'); // Navigate to login screen
      }
    
    }
  };

  // Fetch recent visits when the screen is focused or refreshing
  useEffect(() => {
    if (isFocused || refreshing) {
      fetchRecentVisits();
    }
  }, [isFocused, refreshing, userData?.token]);

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('HomeBarDetails');
  };

  const getPhotoUrl = (photoReference) => {
    // Replace with your Google Places API key
    const apiKey = 'AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  const renderItem = ({ item }) => {
    const bar = item;
    const barLocation = {
      latitude: bar.geometry.location.lat,
      longitude: bar.geometry.location.lng,
    };
    const distance = region && barLocation ? haversineDistance(region, barLocation) : null;

    let photoUrl = 'fallback_image_url'; // Replace with your valid fallback image URL

    try {
    
      if (bar.photos && Array.isArray(bar.photos)) {
        if (bar.photos.length > 0) {
            const photoReference = bar.photos[0].photo_reference;
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
    const averagePriceTier = bar?.averagePriceTier || 0; // Ensure a default value of 0
    return (
      <View style={styles.itemContainerCarouselSlider}>
        <TouchableOpacity onPress={() => handlegotobarDetailScreen(item)}>
          <Image
            source={typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl}
            style={styles.imageCarouselSlider}
            resizeMode="cover"
          />
          <View style={styles.textContainerCarouselSlider}>
            <Text style={styles.movieNameCarouselSlider}
            //  numberOfLines={1} ellipsizeMode="tail"
             numberOfLines={1}  // Allows for 2 lines before truncating
             ellipsizeMode="tail"  // Adds '...' at the end if the text is too long
            >
              {bar.name}
            </Text>
            <Text style={styles.textMilesAway} numberOfLines={1} ellipsizeMode="tail">{bar.vicinity}</Text>
            <Text style={styles.textMilesAway} numberOfLines={1} ellipsizeMode="tail">
            {distance !== null ? `${distance.toFixed(2)} Miles away` : 'Calculating distance...'}
          </Text>
            <View style={styles.iconsSetting}>
              <StarRating rating={bar.averageRating || 3.5} />
              <Text style={styles.separator}>|| </Text>
              {[...Array(3)].map((_, index) => (
                <Icon
                  key={index}
                  name="dollar"
                  size={15}
                  color={index < averagePriceTier ? 'white' : 'gray'} // Gray for uncolored icons
                  style={styles.icon} // Optional: add styles if needed
                />
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleNext = () => {
    carouselRef.current.snapToNext();
  };

  const handlePrev = () => {
    carouselRef.current.snapToPrev();
  };

  if (!recentVisits.length && refreshing) {
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#fff" />;
  }

  return (
    <View style={styles.containerCarouselSlider}>
      <View style={styles.topContainerCarouselSlider}>
        {activeSlide > 0 && (
          <TouchableOpacity style={[styles.arrowButtonCarouselSlider, styles.prevButtonCarouselSlider]} onPress={handlePrev}>
            <Icon name="chevron-left" size={18} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.buttonCarouselSlider}>
          <Text style={styles.buttonTextCarouselSlider}>Recent Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.arrowButtonCarouselSlider, styles.nextButtonCarouselSlider]} onPress={handleNext}>
          <Text style={styles.buttonTextArowCarouselSlider}>
            <Icon name="chevron-right" size={18} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      <View>

      </View>
      <Carousel
        ref={carouselRef}
        data={recentVisits}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 3}
        onSnapToItem={setActiveSlide}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        contentContainerCustomStyle={styles.carouselContentContainer}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(CarouselSlider);
