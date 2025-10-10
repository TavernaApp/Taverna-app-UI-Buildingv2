import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedBar} from '../reducers/anotherReducer';
import axios from 'axios';
import StarRating from '../components/StarRating';
import Icon from 'react-native-vector-icons/FontAwesome';
const defaultImage = require('../assets/images/Rectangle-1210.png');

const BarIdEntryScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigation.navigate("New Crawls")
  };

  const renderBarImage = bar => {
    if (bar.photos && Array.isArray(bar.photos) && bar.photos.length > 0) {
      // Assuming bar.photos is already an array of photo objects
      const photo = bar.photos[0];
      if (photo && photo.photo_reference) {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U`;
        return (
          <Image
            source={{uri: imageUrl}}
            style={styles.IMGTss} // Adjust style as per your design
            onError={error =>
              console.log('Image Load Error:', error.nativeEvent.error)
            }
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

  useEffect(() => {
    const fetchData = async () => {
      if (text.trim() !== '') {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.post(
            `https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/bars/search?query=${text}`,
          );
          if (response.data && Array.isArray(response.data)) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]);
          }
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError('An error occurred while fetching data.');
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchData();
  }, [text]);

  const handleSelectBar = barId => {
    navigation.navigate('New Crawls', {newEntry: barId});
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{flex: 1}}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}>
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
            placeholderStyle={{fontWeight: '700'}}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : error ? (
            <Text style={styles.findtext}>{error}</Text>
          ) : (
            <View>
              <ScrollView>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSelectBar(result)}>
                      <View style={styles.myaddcrawlcontainer}>
                        <View style={styles.imgaddcrawlcontainer}>
                          {renderBarImage(result)}
                          {/* Uncomment the line below if you want to display address */}
                          {/* <Text style={styles.address}>{result.formatted_address}</Text> */}
                          <View>
                            <Text style={styles.RBT}>
                              {result.name.split(' ').slice(0, 3).join(' ')}
                            </Text>
                            <View style={styles.iconsSettings}>
                              <StarRating
                                rating={result.averageRating || 3.5}
                              />
                              <Text style={styles.separator}>|| </Text>
                              {[...Array(3)].map((_, index) => (
                                <Icon
                                  key={index}
                                  name="dollar"
                                  size={15}
                                  color={
                                    index < (result.averagePriceTier || 0)
                                      ? 'white'
                                      : 'gray'
                                  } // Use the result.averagePriceTier safely
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
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default BarIdEntryScreen;
