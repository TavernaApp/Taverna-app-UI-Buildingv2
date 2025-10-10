import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from '../components/StarRating';
import styles from '../css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarMap from '../components/TopBarMap';
import axios from 'axios';

const PopularScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/bars/popular');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    navigation.navigate('Map');
  };

  const getPhotoUrl = (photoReference) => {
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your Google Places API key
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  };

  const handleGoToBarDetailScreen = (bar) => {
    navigation.navigate('BarDetailScreen', { bar });
  };

  const renderItem = ({ item }) => {
    const bar = item;

    let geometry = {};
    if (bar.geometry) {
      try {
        geometry = JSON.parse(bar.geometry);
      } catch (error) {
        console.error('Error parsing geometry:', error);
      }
    }

    let types = [];
    if (bar.types) {
      try {
        types = JSON.parse(bar.types);
      } catch (error) {
        console.error('Error parsing types:', error);
      }
    }

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

    if (photoUrl === 'fallback_image_url') {
      photoUrl = require('../assets/images/Rectangle-1206.png'); // Replace with your fallback image path
    }

    return (
      <View style={styles.itemContainerCarouselSlider}>
        <TouchableOpacity onPress={() => handleGoToBarDetailScreen(bar)}>
          <View style={styles.imageRecentActivity}>
            <Image
              source={typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl}
              style={styles.imageCarouselSlider}
              resizeMode="cover"
            />
            <View style={styles.textContainerCarouselSlider}>
              {/* Additional text components if needed */}
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

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

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
            style={styles.topBarButtonAlignmentRecentActivity}
          >
            <Text style={styles.topBarButtonTextRecentActivity}>Popular</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.contentContainerStyleRecentActivity}
        />
      </View>
    </View>
  );
};

export default PopularScreen;
