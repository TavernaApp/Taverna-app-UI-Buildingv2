import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles';

const StarRatingincreasesize = ({ rating, onStarPress }) => {
    const renderStar = (index) => {

        const filledStars = Math.floor(rating);
        const isHalfStar = rating - filledStars >= 0.5;
        if (index < filledStars) {
            return <Icon key={index} name="star" size={18} color="gray" onPress={() => onStarPress(index + 1)} style={styles.StarRatingincreasesize} />;
        } else if (index === filledStars && isHalfStar) {
            return <Icon key={index} name="star-half-empty" size={18} color="gray" onPress={() => onStarPress(index + 1)} style={styles.StarRatingincreasesize} />;
        } else {
            return <Icon key={index} name="star-o" size={18} color="gray" onPress={() => onStarPress(index + 1)} style={styles.StarRatingincreasesize} />;
        }
    };

    return (
        <View style={{ flexDirection: 'row'}}>
            {/* Render star icons based on the rating */}
            {[...Array(5).keys()].map(index => (
                <TouchableOpacity key={index}>
                    {renderStar(index)}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default StarRatingincreasesize;
