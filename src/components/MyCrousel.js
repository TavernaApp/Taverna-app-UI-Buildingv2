// components/MyCarouselSlider.js

import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';
import StarRating from './StarRating';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import styles from '../css/styles';

const MyCarouselSlider = ({ userData }) => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reviews, setReviews] = useState([]);
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userId = userData?.user?.id;
        const token = userData?.token;

        if (!userId || !token) {
          console.error('User data or token not available');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/reviews/user/${userId}/recent`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching recent reviews:', error);
      }
    };

    fetchReviews();
  }, [userData]);

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar.Bar));
    // console.log(bar.Bar.name)
    navigation.navigate('MyProfileBarDetails');
  };

  const getPhotoUrl = (photoReference) => {
    const apiKey = 'AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  const renderItem = ({ item }) => {
    const barNameWords = item.Bar.name.split(' ');
    const shortenedName = barNameWords.slice(0, 2).join(' ');

    const displayRating = item.rating || 2; // Default to 2 if item.rating is falsy
    const bar = item;
    let photoUrl = 'fallback_image_url';

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

    if (photoUrl === 'fallback_image_url') {
      photoUrl = require('../assets/images/Rectangle-1206.png');
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

  const handleNext = () => {
    carouselRef.current.snapToNext();
  };

  const handlePrev = () => {
    carouselRef.current.snapToPrev();
  };

  const handleTabPress = (ScreenName) => {
    navigation.navigate(ScreenName);
  };

  return (
    <View style={styles.containerMyCarouselSlider}>
      <Carousel
        ref={carouselRef}
        data={reviews}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 4}
        onSnapToItem={(index) => setActiveSlide(index)}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        contentContainerCustomStyle={styles.MycarouselContentContainer}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(MyCarouselSlider);
