import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles'; // Ensure styles are imported correctly
import ProfileScreenTopBar from '../components/ProfileScreenTopBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '@env';
import { connect } from 'react-redux';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import FriendProfileScreenTopBar from '../components/FriendProfileScreenTopBar';
import StarRatingCenter from '../components/StarRatingCenter';
import StarRating from '../components/StarRating';

const CrawlsScreen = ({ navigation, userData, route }) => {
  const [profileImage, setProfileImage] = useState("");
  const [crawls, setCrawls] = useState([]);
  const isFocused = useIsFocused();
  const username = userData?.user?.username;
  const friend = route?.params?.friend || null;

  useEffect(() => {
    const fetchCrawls = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/crawls/user/${friend?.id}`, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        console.log(response.data);  // Log the response to check its structure
        setCrawls(response.data);
      } catch (error) {
        console.error('Error fetching crawls:', error);
      }
    };

    if (isFocused) {
      fetchCrawls();
    }
  }, [isFocused]);

  const handleCrawls = () => {
    Alert.alert(
      "Sorry!",
      "You're only a friend, you cannot create a crawl.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ],
      { cancelable: false }
    );
  };

  const handleCrawlDetails = (crawl) => {
    navigation.navigate('Crawl Details', { crawl });
  };

  const handleGoBack = () => {
    navigation.navigate('My Profile');
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
      <FriendProfileScreenTopBar />
      <View style={styles.MytopBarButtonRecentActivity}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.MyimageContainer}>
        <Image
          source={friend?.profileImage ? { uri: friend.profileImage } : require('../assets/images/face.png')}
          style={styles.profileImage}
        />
        <Text style={styles.imageText}>{friend?.username}</Text>
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
                  {
                    crawl.participants && crawl.participants.length > 0 ? (
                      crawl.participants.map(participant => (
                        <Text key={participant.id} style={styles.CrawledsmallT}>
                          {participant.username ? participant.username : "Crawl Participant Username"}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.CrawledsmallT}>No participants available</Text>
                    )
                  }
                </View>
              </View>
              <View style={styles.IMGTssCont}>
                {crawl.Bars?.slice(0, 4).map((bar, barIndex) => {
                  const averagePriceTier = bar.averagePriceTier || 1; // Default to 1 if it doesn't exist
                  return (
                    <View key={barIndex} style={styles.barContainer}>
                      {renderBarImage(bar)}
                      <Text style={{ marginLeft: '6%', color:"white" }}>{bar.name.split(' ').slice(0, 2).join(' ')}</Text>
                      <View style={styles.iconsSet}>
                        <StarRating rating={bar.averageRating || 3.5} />
                        <Text style={styles.separator}>|| </Text>
                        {[...Array(3)].map((_, index) => (
                          <Icon
                            key={index}
                            name="dollar"
                            size={15}
                            color={index < averagePriceTier ? 'white' : 'gray'}
                            style={styles.icon}
                          />
                        ))}
                      </View>
                    </View>
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

// Connecting component to Redux store
export default connect(mapStateToProps)(CrawlsScreen);
