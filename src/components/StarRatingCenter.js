import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have installed react-native-vector-icons
import styles from '../css/styles';

const StarRatingCenter = ({ rating, onStarPress }) => {
  // Function to render each star icon based on the rating
  const renderStar = (index) => {
    const filledStars = Math.floor(rating);
    const isHalfStar = rating - filledStars >= 0.5;

    if (index < filledStars) {
      return <Icon key={index} name="star" size={12} color="gold" style={styles.imageStarRatingCenter} />;
    } else if (index === filledStars && isHalfStar) {
      return <Icon key={index} name="star-half-empty" size={13} color="gold" style={styles.imageStarRatingCenter} />;
    } else {
      return <Icon key={index} name="star-o" size={13} color="gold" style={styles.imageStarRatingCenter} />;
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent:"center" }}>
      {/* Render star icons based on the rating */}
      {[...Array(5).keys()].map(index => (
        <TouchableOpacity key={index}>
          {renderStar(index)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRatingCenter;
