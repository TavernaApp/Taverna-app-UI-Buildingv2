import React, { useRef } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from '../css/styles';
import FallbackImage from '../assets/images/Rectangle-1206.png'; // Import the local image
import StarRatingCenter from './StarRatingCenter';

const MyCarouselSlider = ({ savedBars }) => {
  const carouselRef = useRef(null);

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

    return (
      <View style={styles.itemContainerMyCarouselSlider}>
        <Image
          source={imageUrl}
          style={styles.MyimageCarouselSlider}
          resizeMode="cover"
        />
        <View style={styles.textContainerMyCarouselSlider}>
          <Text style={styles.movieNameMyCarouselSlider}>{item.name}</Text>
          <StarRatingCenter rating={item.user_ratings_total / 100} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerMyCarouselSlider}>
      <Carousel
        ref={carouselRef}
        data={savedBars}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width / 4}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        contentContainerCustomStyle={styles.MycarouselContentContainer}
      />
    </View>
  );
};

export default MyCarouselSlider;
