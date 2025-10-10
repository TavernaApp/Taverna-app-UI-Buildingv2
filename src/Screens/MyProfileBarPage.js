import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ScrollView, Alert } from 'react-native';
import StarRating from '../components/StarRating';
import styles from '../css/styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Reviewchats from './Reviewchats';
import PlusReview from './PlusReview';
import axios from 'axios';
import StarRatingincreasesize from '../components/StarRatingincreasesize';

const MyProfileBarPage = () => {
  const navigation = useNavigation();
  const selectedBar = useSelector((state) => state.another.selectedBar);
  const [isPlusReviewVisible, setIsPlusReviewVisible] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [rating, setRating] = useState(5);
  const [allRatings, setAllratings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [iconStates, setIconStates] = useState([false, false, false]);
const [address , setAddress] = useState("");
const [isTimingsModalVisible, setIsTimingsModalVisible] = useState(false); // State for timing modal
const [isBottomModalVisible, setIsBottomModalVisible] = useState(false); // Add this state

const handleOpenBottomModal = () => setIsBottomModalVisible(true); // Function to show the modal
const handleCloseBottomModal = () => setIsBottomModalVisible(false); // Function to close the modal
  const vicinity = selectedBar.vicinity || selectedBar.formatted_address;
const placeId = selectedBar.place_id;
const [openingHours, setOpeningHours] = useState([]);
const location = selectedBar.geometry?.location;
const [BarUrl,setBarUrl]= useState();
const handleOpenTimingsModal = () => setIsTimingsModalVisible(true);
const handleCloseTimingsModal = () => setIsTimingsModalVisible(false);
useEffect(() => {
  const fetchOpeningHours = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U`);
     setAddress(response.data.result.formatted_address)
      // Extract opening hours
      setBarUrl(response.data.result?.url)
      const hours = response.data.result.opening_hours;
      if (hours && hours.weekday_text) {
        setOpeningHours(hours.weekday_text);
      }
    } catch (error) {
      console.error('Error fetching opening hours:', error);
      Alert.alert('Error', 'Failed to fetch opening hours. Please try again later.');
    }
  };

  fetchOpeningHours();
}, [selectedBar.id]);


  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/bars/${selectedBar.id}/ratings`);
        setRatings(response.data.ratings);
        setAllratings(response.data);
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalRatings);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        Alert.alert('Error', 'Failed to fetch ratings. Please try again later.');
      }
    };
    fetchRatings();
  }, [selectedBar.id]);

  const handlePlusReview = () => setIsPlusReviewVisible(true);
  const handleClosePlusReview = () => setIsPlusReviewVisible(false);
  const handleReviewChats = () => navigation.navigate('HomeReviewchats');

  const toggleIconColor = useCallback((index) => {
    setIconStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  }, []);

    const handlePress = () => {
      Linking.openURL(BarUrl).catch(err => console.error("An error occurred", err));
    }
  const calculatePercentage = (count) => (totalRatings ? ((count / totalRatings) * 100).toFixed(1) : 0);


  return (
    <View style={styles.containerBelowImage}>
     
    <View style={{flex:1, flexDirection:"row", justifyContent:"space-between", padding:10}}>
      
    <Text style={styles.barpagefirsttext} numberOfLines={2}>{selectedBar.name}</Text>
<TouchableOpacity style={styles.barpageplusButton} onPress={handleOpenBottomModal}>
        <Icon name="plus-circle" size={35} color="white" />
      </TouchableOpacity>
    </View>
    <Text style={{textDecorationLine:"underline", color:"white",paddingHorizontal:10,}}>Websitelink.com</Text>
    <Text style={{textDecorationLine:"underline", color:"white",paddingHorizontal:10,}}>042-192-122</Text>
    <View style={styles.barclockimgcontainer}>
      <TouchableOpacity style={styles.barlocationimgcontainer} 
      // onPress={() => navigation.navigate('Map', { location })}
      onPress={handlePress}
      >
       <Image source={require('../assets/images/Location.png')} style={styles.Barclockimg} />
        <Text style={styles.Barclocktext}>Location: {address}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOpenTimingsModal}>
      <View style={styles.barlocationimgcontainer}>
        <Image source={require('../assets/images/Clock.png')} style={styles.Barclockimg} />
        <Text style={styles.Barclocktext}>
          Today: {selectedBar.opening_hours ? (selectedBar.opening_hours.open_now ? 'Open' : 'Closed') : 'N/A'}
        </Text>
      </View>
      </TouchableOpacity>
    </View>
    <View style={{borderWidth:1, borderColor:"white"}}/>
    {/* <Text style={{textAlign:'center', color:"white", marginBottom:2, marginTop:4}}>Reviews-100</Text> */}
    <View style={{alignSelf:"center", marginTop:10}}>
      <TouchableOpacity onPress={handleReviewChats}>
        <View style={styles.reviewcrec}>
          <Text style={styles.cCrecText}>Reviews</Text>
        </View>
      </TouchableOpacity>
    
    </View>
    {allRatings && Object.keys(allRatings).length > 0 && (
        <View style={styles.dollarcontainer}>
{/* <StarRatingincreasesize rating={selectedBar?.averageRating || 0}  /> */}
<StarRatingincreasesize rating={allRatings?.averageRating || 0} onStarPress={setRating} />


<View  style={styles.iconContainers}></View>
{allRatings.averagePriceTier > 0 ? (
    <View style={styles.dollarcontainer}>
    {Array.from({ length: 3 }).map((_, index) => (
      <Icon 
        key={index} 
        name="dollar" 
        size={15} 
        color={index < allRatings.averagePriceTier ? 'white' : '#8A95A1'} 
      />
    ))}
  </View>
):(

  <View style={styles.dollarcontainer}>
  {Array.from({ length: 3 }).map((_, index) => (
    <Icon 
      key={index} 
      name="dollar" 
      size={15} 
      color={index < 2 ? 'white' : '#8A95A1'} 
    />
  ))}
</View>
)}
</View>
)}
    <View style={styles.Barboxmaincontainers}>
        {ratings.map((rating) => (
          <View key={rating.id} style={styles.Barboxcont}>
            <Image
              source={rating.User.profileImage ? { uri: rating.User.profileImage } : require('../assets/images/face.png')}
              style={styles.Barboximg}
            />
            <Text style={styles.Barboxtext}>{rating.User.username}</Text>
            <View style={styles.Barstarcont}>
              <StarRating rating={rating.rating} size={16} />
            </View>
          </View>
        ))}
    </View>
    
{/* SLIDE UP SECTION */}
<View style={{padding: 15}}>

<Modal
  animationType="slide"
  transparent={true}
  visible={isBottomModalVisible}
  onRequestClose={handleCloseBottomModal}
>
  <View style={styles.bottomModalContainer}>
    <View style={styles.bottomModalContent}>
      
      {/* Icons Row */}
      <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 10}}>
        <View style={{alignItems: "center"}}>
          <Icon name="eye" size={24} color="white" />
          <Text style={{color: "white"}}>Visited</Text>
        </View>
        <TouchableOpacity>
          <View style={{alignItems: "center"}}>
            <Icon name="heart" size={24} color="white" />
            <Text style={{color: "white"}}>{allRatings?.averageLikes || 0}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: "center"}} onPress={handlePress}>
          <Icon name="map-marker" size={24} color="white" />
          <Text style={{color: "white"}}>Bars</Text>
        </TouchableOpacity>
      </View>

      {/* Stars Row */}
      <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
        <View style={styles.starryimages}>
          <StarRatingincreasesize rating={rating} onStarPress={setRating} />
        </View>
      </View>

      {/* Price Row */}
      <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10}}>
        {iconStates.map((iconState, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => toggleIconColor(index)} 
          >
            <Icon name="dollar" size={15} color={iconState ? '#8A95A1' : 'white'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Write a Review Button */}
      <TouchableOpacity onPress={handlePlusReview}>
        <View style={{
          backgroundColor: "#842AC5", 
          paddingVertical: 10, 
          borderRadius: 5, 
          alignItems: "center", 
          marginVertical: 15
        }}>
          <Text style={{color: "white", fontSize: 16}}>Write a Review</Text>
        </View>
      </TouchableOpacity>
      
      {/* Close Button */}
      <TouchableOpacity onPress={handleCloseBottomModal}>
        <Text style={{color: "white", textAlign: "center", marginTop: 10}}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


 {/* Timings Modal */}
 <Modal
        animationType="slide"
        transparent={true}
        visible={isTimingsModalVisible}
        onRequestClose={handleCloseTimingsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, color: "white", marginBottom: 10 }}>Timings</Text>
            {openingHours.length > 0 ? (
              openingHours.map((dayTiming, index) => {
                const [day, time] = dayTiming.split(': '); // Split day and time
                return (
                  <View key={index} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "white" }}>{day}</Text>
                    <Text style={{ color: "white" }}>{time || "CLOSED"}</Text>
                  </View>
                );
              })
            ) : (
              <Text style={{ color: "white" }}>Opening hours not available</Text>
            )}
            <TouchableOpacity onPress={handleCloseTimingsModal}>
              <Text style={{ color: "white", marginTop: 20, textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

</View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={isPlusReviewVisible}
      onRequestClose={handleClosePlusReview}
    >
      <PlusReview onClose={handleClosePlusReview} />
    </Modal>
  </View>
  );
};

export default MyProfileBarPage;
