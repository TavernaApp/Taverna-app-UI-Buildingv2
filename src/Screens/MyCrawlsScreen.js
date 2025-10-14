import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles'; // Ensure styles are imported correctly
import ProfileScreenTopBar from '../components/ProfileScreenTopBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '@env';
import { connect } from 'react-redux';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import StarRating from '../components/StarRating';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBar } from '../reducers/anotherReducer';

const MyCrawlsScreen = ({ navigation, userData }) => {
  const [profileImage, setProfileImage] = useState("");
  const [crawls, setCrawls] = useState([]);
  const isFocused = useIsFocused();
  const username = userData?.user?.username;
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();

  const handlegotobarDetailScreen = (bar) => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('CrawlBarDetails');
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userData?.user?.id}/profile`, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        setProfileImage(response?.data?.profileImage);
      } catch (error) {
        // Profile fetch failed - use default image
        setProfileImage("");
      }
    };

    const fetchCrawls = async () => {
      try {
        const response = await axios.get(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/crawls`, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        console.log(response.data);  // Log the response to check its structure
        setCrawls(response.data);
      } catch (error) {
        // Endpoint failed - show empty list
        setCrawls([]);
      }
    };

    if (isFocused) {
      fetchProfileImage();
      fetchCrawls();
    }
  }, [isFocused]);

  const handleCrawls = () => {
    navigation.navigate('New Crawls');
  };

  const handleCrawlDetails = (crawl) => {
    navigation.navigate('Crawl Details', { crawl });
  };
  

  const handleGoBack = () => {
    navigation.navigate('My Profile');
  };

  const renderBarImage = (bar) => {
   
    
    if (bar.photos && Array.isArray(bar.photos) && bar.photos.length > 0) {
        // Assuming bar.photos is already an array of photo objects
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

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <ProfileScreenTopBar />
      <View style={styles.MytopBarButtonRecentActivity}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.MyimageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/images/face.png')}
          style={styles.profileImage}
        />
        <Text style={styles.imageText}>{username}</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.containerBelowText}>
          <TouchableOpacity style={styles.followButton} onPress={handleCrawls}>
            <Text style={styles.followButtonText}>Create Crawl</Text>
          </TouchableOpacity>
          {crawls.map((crawl, index) => (
            <View key={index} style={styles.TRectSBS}>
              <View style={styles.Crawltopcontainer}>
              <TouchableOpacity onPress={() => handleCrawlDetails(crawl)}>
                  <Text style={styles.CrawlbigT}>{crawl.name}</Text>
                </TouchableOpacity>
                <Text style={styles.CrawlsmallT}>{crawl.Bars?.length || 0} Bars</Text>
              </View>
              <View style={styles.Crawlmyfollowcontainer}>
                <View style={styles.Crawlimgusercontainer}>
                  <Image
                    source={require('../assets/images/face.png')}
                    style={styles.Crawlmyuserimg}
                  />
                  {/* <Text style={styles.RBT}>{userData?.user?.username || 'unknown'}</Text> */}
                
                  {
                  crawl.participants && crawl.participants.length > 0 ? (
                    crawl.participants.map(participant => (
                      <Text key={participant.id} style={styles.CrawledsmallT}>
                        {participant.username ? participant.username : "Crawl Participant Username"}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.CrawledsmallT}>No participants available</Text>
                  )}
                </View>
              </View>
              <View style={styles.IMGTssCont}>
                {crawl.Bars?.slice(0, 4).map((bar, barIndex) => {
                  const averagePriceTier = bar.averagePriceTier || 0; // Default to 0 if not available
                  return (
                    <TouchableOpacity onPress={() => handlegotobarDetailScreen(bar)} key={barIndex} style={styles.barContainer}>
                      {renderBarImage(bar)}
                      <Text  style={{marginLeft:'6%', color:"white" }}>{bar.name.split(' ').slice(0, 2).join(' ')}</Text>
                      <View style={styles.iconsSet}>
                        <StarRating rating={bar.averageRating || 3.5} />
                        <Text style={styles.separator}>|| </Text>
                        {[...Array(3)].map((_, index) => (
                          <Icon
                            key={index}
                            name="dollar"
                            size={15}
                            color={index < averagePriceTier ? 'white' : 'gray'} // Use the averagePriceTier value safely
                            style={styles.icon}
                          />
                        ))}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {index < crawls.length - 1 && <View style={styles.thinBottomLine}></View>}
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData
});

export default connect(mapStateToProps)(MyCrawlsScreen);
