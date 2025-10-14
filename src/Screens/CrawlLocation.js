  import React, { useState, useEffect, useRef } from 'react';
  import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
  import MapView, { Marker } from 'react-native-maps';
  import Geolocation from '@react-native-community/geolocation';
  import LinearGradient from 'react-native-linear-gradient';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { FloatingAction } from 'react-native-floating-action';
  import { useSelector, useDispatch } from 'react-redux';
  import { setSelectedBar } from '../reducers/anotherReducer'; // Adjust the path as per your project structure
  import TopBarMap from '../components/TopBarMap'; // Adjust the path as per your project structure
  import styles from '../css/styles'; // Adjust the path as per your project structure

  const CrawlLocation = ({ navigation, crawl }) => {

    const [restaurants, setRestaurants] = useState([]);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [fabVisible, setFabVisible] = useState(false);
    const selectedBar = useSelector(state => state.another.selectedBar); // Adjust the state slice as per your Redux setup
    const dispatch = useDispatch();

    const mapRef = useRef(null);

    useEffect(() => {
      fetchUserLocation();
    }, []);

    const fetchUserLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          };
          setRegion(newRegion);
          fetchNearbyRestaurants(latitude, longitude);
        },
        error => {
          setError(null);
          setLoading(false);
        }
      );
    };

    const fetchNearbyRestaurants = async (latitude, longitude) => {
      try {
        const response = await fetch('https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/bars/liveLocation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!response.ok) {
          throw new Error('Error fetching nearby bars');
        }

        const data = await response.json();
        setRestaurants(crawl.Bars);
      } catch (error) {
        console.error('Error fetching bars:', error);
        setError('Error fetching restaurants');
      } finally {
        setLoading(false);
      }
    };

    const handleGoBack = () => {
      navigation.goBack();
    };

    const handlegotobarDetailScreen = (bar) => {
      dispatch(setSelectedBar(bar)); // Dispatch action to set selected bar in Redux state
      navigation.navigate('MapBarDetailScreen'); // Navigate to BarDetails screen
    };

    const handleRecenter = () => {
      if (mapRef.current && region) {
        const newRegion = {
          ...region,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        mapRef.current.animateToRegion(newRegion, 500);
      }
    };

    const handleZoomIn = () => {
      if (mapRef.current && region) {
        const newRegion = {
          ...region,
          latitudeDelta: region.latitudeDelta * 0.5,
          longitudeDelta: region.longitudeDelta * 0.5,
        };
        mapRef.current.animateToRegion(newRegion, 500);
        setRegion(newRegion);
      }
    };

    const handleZoomOut = () => {
      if (mapRef.current && region) {
        const newRegion = {
          ...region,
          latitudeDelta: region.latitudeDelta * 2,
          longitudeDelta: region.longitudeDelta * 2,
        };
        mapRef.current.animateToRegion(newRegion, 500);
        setRegion(newRegion);
      }
    };

    useEffect(() => {
      if (selectedRestaurant) {
        navigation.navigate('RestaurantDetailScreen', { restaurant: selectedRestaurant });
      }
    }, [selectedRestaurant]);

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      );
    }

    return (
     
          <View style={{ flex: 1 , width:"90%", height:"100%", alignSelf:"center"}}>
       
          {region && (
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              region={region}
              onPress={() => setFabVisible(false)}
            >
              <Marker
                coordinate={region}
                title="Your Location"
                pinColor="blue"
              />
              {restaurants.map((restaurant, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: restaurant.geometry.location.lat,
                    longitude: restaurant.geometry.location.lng,
                  }}
                  title={restaurant.name}
                  // onPress={() => {
                  //   handlegotobarDetailScreen(restaurant); // Pass the selected restaurant to the function
                  //   setFabVisible(true);
                  // }}
                />
              ))}
            </MapView>
          )}
          <FloatingAction
            actions={[
              {
                text: 'View Details',
                icon: <Icon name="info-circle" size={20} color="white" />,
                name: 'btn_view_details',
                position: 1,
                color: 'blue',
                onPressItem: () => {
                  if (selectedRestaurant) {
                    navigation.navigate('RestaurantDetailScreen', { restaurant: selectedRestaurant });
                  }
                },
              },
            ]}
            overrideWithAction={true}
            visible={fabVisible}
          />
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
              <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
              <Icon name="minus" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
            <Icon name="crosshairs" size={24} color="white" />
          </TouchableOpacity>
        </View>
    
    );
  };

  export default CrawlLocation;
