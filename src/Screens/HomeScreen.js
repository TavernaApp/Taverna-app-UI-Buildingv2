import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CarouselSlider from '../components/CarouselSlider';
import NewFromFriendsCarouselSlider from '../components/NewFromFriendsCarouselSlider';
import { connect } from 'react-redux';
import styles from '../css/styles'; // Import your styles

const HomeScreen = ({ userData }) => {
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when refreshing starts
    // Perform any data fetching logic here
    setTimeout(() => {
      setRefreshing(false); // Set refreshing to false after data fetching completes
    }, 2000); // Simulating a delay for demonstration purposes (remove this line in production)
  };

  return (
    <View style={{flex:1, backgroundColor:"#2A0955"}}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent} // Apply your custom styles here
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.carouselContainer}>
          <CarouselSlider refreshing={refreshing} onRefresh={onRefresh} />
        </View>

        <View style={styles.carouselContainer}>
          <NewFromFriendsCarouselSlider refreshing={refreshing} onRefresh={onRefresh} />
        </View>

      </ScrollView>
    </View>
  );
};

// Define mapStateToProps function to map user data from Redux state to props
const mapStateToProps = (state) => ({
  userData: state.user.userData, // Assuming user data is stored under user.userData
});

export default connect(mapStateToProps)(HomeScreen); // Connect HomeScreen to Redux store
