import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';

const StarRatings = ({ rating }) => {
    // Logic to render star ratings based on the 'rating' prop
    return (
      <View style={{ flexDirection: 'row' }}>
        {/* Render star icons based on the rating */}
        {Array.from({ length: Math.floor(rating) }, (_, index) => (
          <Image
            key={index}
            source={require('../assets/images/star_filled.png')} // Change the image source accordingly
            style={styles.imageStarRatings}
          />
        ))}
      </View>
    );
  };
  export default StarRatings;