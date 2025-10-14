import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from '../components/StarRating'; // Make sure you import StarRating if it's a custom component

const defaultImage = require('../assets/images/Rectangle-1210.png');

const PlusScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('PlusBarDetails');
  };

  const renderBarImage = (bar) => {
    if (bar.photos && Array.isArray(bar.photos) && bar.photos.length > 0) {
      const photo = bar.photos[0];
      if (photo && photo.photo_reference) {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U`;
        return (
          <Image
            source={{ uri: imageUrl }}
            style={styles.IMGTss} // Adjust style as per your design
                    onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)}
          />
        );
      }
    }
    // Fallback image or placeholder
    return (
      <Image
        source={require('../assets/images/Rectangle-1206.png')} // Adjust path to your placeholder image
        style={styles.IMGTss} // Adjust style as per your design
      />
    );
  };

  const fetchData = useCallback(async () => {
    if (text.trim() !== '') {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/bars/search?query=${text}`);
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          setSearchResults(response.data);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        // Endpoint failed - show no results
        setSearchResults([]);
        setError(null);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  }, [text]);

  useEffect(() => {
    fetchData();
  }, [text, fetchData]);

  return (
    <View style={{flex:1, backgroundColor:"#2A0955"}}
    >
      <View style={styles.Incontainer}>
        <View style={styles.searchconti}>
          <View style={styles.cancelbuttonActivity}>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={styles.CancelBT}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Finduserbox}>
            <Text style={styles.FinduserText}>Search</Text>
          </View>
        </View>

        <View style={styles.Findusercontainer}>
          <TextInput
            style={styles.Findinput}
            onChangeText={setText}
            value={text}
            placeholder="Search"
            placeholderTextColor="white"
            placeholderStyle={{ fontWeight: '700' }}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : error ? (
            <Text style={styles.findtext}>{error}</Text>
          ) : (
            <ScrollView>
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <TouchableOpacity key={index} onPress={() => handlegotobarDetailScreen(result)}>
                    <View style={styles.myaddcrawlcontainer}>
                      <View style={styles.imgaddcrawlcontainer}>
                        {renderBarImage(result)}
                       <View>
                       <Text style={{fontSize:15,color:"white", fontWeight:"bold", paddingHorizontal:2}}>{result.name.split(' ').slice(0, 3).join(' ')}</Text>
                       <Text style={{color:"white", fontSize:12, paddingHorizontal:2, width:"95%"}}>{result.plus_code ? result.plus_code.compound_code : 'Address not available'} </Text>
                {/* Uncomment the line below if you want to display address */}
                {/* <Text style={styles.address}>{result.formatted_address}</Text> */}
              <View style={styles.iconsSettings}>
                  <StarRating rating={result.averageRating || 3.5} />
                  <Text style={styles.separator}>|| </Text>
                  {[...Array(3)].map((_, index) => (
                    <Icon
                      key={index}
                      name="dollar"
                      size={15}
                      color={index < (result.averagePriceTier || 0) ? 'white' : 'gray'} // Use the result.averagePriceTier safely
                      style={styles.icon}
                    />
                  ))}
                </View>  
                       </View>
                      </View>
                    </View>
                    
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.findtext}>No Results Found</Text>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default PlusScreen;
