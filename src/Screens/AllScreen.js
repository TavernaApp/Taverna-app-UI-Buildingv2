import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';
import styles from '../css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarMap from '../components/TopBarMap';
import axios from 'axios';
import StarRating from '../components/StarRating'; // Import StarRating component if exists

const AllScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [data, setData] = useState([]); // Define data state variable

  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('BarDetails');
  };

  useEffect(() => {
    fetchBars();
  }, []);

  const fetchBars = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/allgetbars');
      setData(response.data); // Assuming response.data is an array of bars

      setLoading(false);
    } catch (error) {
      // Endpoint failed - show empty list
      setData([]);
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Map');
  };

  const handleEndReached = () => {
    // Implement logic to fetch more data when end of list is reached
    console.log('End of list reached!');
    // Example: Implement pagination or load more data
  };

  const getPhotoUrl = (photoReference) => {
    const apiKey = 'AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U'; // Replace with your Google Places API key
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  const renderItem = ({ item }) => {
    const bar = item;
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

    return (
      <View style={styles.containerRecentActivity}>
        <TouchableOpacity onPress={() => handlegotobarDetailScreen(item)}>  
        <View style={styles.imageRecentActivity}>
          <Image
            source={typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl}
            style={styles.imageResizeRecentActivity}
            resizeMode="cover"
          />
          <View style={styles.textContainerCarouselSlider}>
          </View>
          </View>
            <Text style={styles.nameRecentActivity} numberOfLines={1} ellipsizeMode="tail">
              {bar.name}
            </Text>
          <StarRating rating={bar.averageRating || 3.5} /> 
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{backgroundColor:"#2A0955", flex:1}}
    >
      <TopBarMap />
      <View style={styles.FlatListRecentActivity}>
        <View style={styles.topBarButtonRecentActivity}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.imageBackArrowRecentActivity}>
              <Icon name="chevron-left" size={18} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGoBack}
            style={styles.topBarButtonAlignmentRecentActivity}>
             <Text style={styles.topBarButtonTextRecentActivity}>
              All
            </Text>
             </TouchableOpacity>
        </View>
        {loading && !isFetchingMore ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Loading...</Text>
          </View>
        ) : data.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>No bars found.</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.contentContainerStyleRecentActivity}
            onEndReached={handleEndReached} // This function must be defined
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingMore ? <Text style={{color: 'white'}}>Loading more...</Text> : null
            }
          />
        )}
      </View>
    </View>
  );
};

export default AllScreen;
