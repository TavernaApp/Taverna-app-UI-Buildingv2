import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {setSelectedBar} from '../reducers/anotherReducer';
import styles from '../css/styles'; // Assuming styles are defined in this file
import TopBarMap from '../components/TopBarMap';
import StarRating from '../components/StarRating';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [bars, setBars] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();


  const defaultImage = require('../assets/images/Rectangle-1210.png');

  useEffect(() => {
    fetchData();
  }, [text]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/bars/searchbarandusers?query=${text}`,
      );
      setBars(response.data.bars || []);
      setUsers(response.data.users || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handlegotobarDetailScreen = bar => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('SearchBarDetails');
  };

  const handleSeeMore = user => {
    navigation.navigate('SearchFriendDetailsScreen', {friend: user});
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getFirstThreeWords = name => {
    return name.split(' ').slice(0, 3).join(' ');
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{flex: 1}}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}>
      <TopBarMap />
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

          <Text style={styles.findtext}>Recent</Text>

          <ScrollView>
            {/* Display Users */}
            {users.map(user => (
              <TouchableOpacity
                key={user.id}
                style={styles.myfindusercontainer}
                onPress={() => handleSeeMore(user)}>
                <View style={styles.imgusercontainer}>
                  <Image
                    source={
                      user.profileImage
                        ? {uri: user.profileImage}
                        : require('../assets/images/face.png')
                    }
                    style={styles.myuserimg}
                  />
                  <Text style={styles.RBT}> {user.username}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Display Bars */}
            {isLoading ? (
              <Text style={styles.findtext}>Loading...</Text>
            ) : bars.length > 0 ? (
              bars.map((result, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlegotobarDetailScreen(result)}>
                  <View style={styles.myaddcrawlcontainer}>
                    <View style={styles.imgaddcrawlcontainer}>
                      {result.photos && result.photos.length > 0 ? (
                        <Image
                          source={{
                            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U`,
                          }}
                          defaultSource={defaultImage}
                          style={styles.myaddcrawlimg}
                        />
                      ) : (
                        <Image
                          source={defaultImage}
                          style={styles.myaddcrawlimg}
                        />
                      )}
                      <View>
                      <Text style={{fontSize:15,color:"white", fontWeight:"bold",}}>  {getFirstThreeWords(result.name)}</Text>
                    
                        <Text style={{color:"white", fontSize:12, paddingHorizontal:5, width:"95%"}}>{result.plus_code ? result.plus_code.compound_code : 'Address not available'} </Text>
               
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
      </View>
    </LinearGradient>
  );
};

export default SearchScreen;
