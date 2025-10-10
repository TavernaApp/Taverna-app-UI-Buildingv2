import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../css/styles';
import MyCarouselSlider from '../components/MyCrousel';
import LinearGradient from 'react-native-linear-gradient';
import ProfileScreenTopBar from '../components/ProfileScreenTopBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useIsFocused } from '@react-navigation/native';

const MyProfileScreen = ({ navigation, userData }) => {
  const [profileImage, setProfileImage] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [visitBarCount, setVisitBarCount] = useState(0);
  const [totalBarCount, setTotalBarCount] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(`${BASE_URL}/api/users/${userData?.user?.id}/profile`, {
          headers: { 'Authorization': `Bearer ${userData?.token}` }
        });
        setProfileImage(profileRes?.data?.profileImage);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          // Handle unauthorized error (e.g., redirect to login screen)
          console.error('Unauthorized access or token expired');
        } else {
          console.error('Error fetching profile data:', error);
        }
      }
  
      try {
        const followerRes = await axios.get(`${BASE_URL}/api/users/getfollowercount/${userData?.user?.id}`, {
          headers: { 'Authorization': `Bearer ${userData?.token}` }
        });
        setFollowerCount(followerRes.data.followerCount);
      } catch (error) {
        console.error('Error fetching follower count:', error);
      }
  
      try {
        const followingRes = await axios.get(`${BASE_URL}/api/users/getfollowingcount/${userData?.user?.id}`, {
          headers: { 'Authorization': `Bearer ${userData?.token}` }
        });
        setFollowingCount(followingRes.data.followingCount);
      } catch (error) {
        console.error('Error fetching following count:', error);
      }
  
      try {
        const visitCountsRes = await axios.get(`${BASE_URL}/api/users/${userData?.user?.id}/visitcounts`, {
          headers: { 'Authorization': `Bearer ${userData?.token}` }
        });
        const { visitCount, totalBars } = visitCountsRes.data;
        setVisitBarCount(visitCount);
        setTotalBarCount(totalBars);
      } catch (error) {
        console.error('Error fetching visit counts:', error);
      }
    };
  
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, userData?.user?.id, userData?.token]);
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSetting = () => {
    navigation.navigate('Setting');
  };

  const handleShowFollowers = () => {
    navigation.navigate('Follow');
  };

  const handleShowFollowing = () => {
    navigation.navigate('Following');
  };

  const handleGoProfileImage = () => {
    navigation.navigate('ChangeProfileImageScreen');
  };

  const username = userData?.user?.username;

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <ProfileScreenTopBar />

      <View style={styles.MytopBarButtonRecentActivity}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="chevron-left" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSetting}>
          <Icon
            style={styles.MyimageFrontArrowRecentActivity}
            name="cog"
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.MyimageContainer}>
        <TouchableOpacity onPress={handleGoProfileImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/images/face.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.imageText}>{username}</Text>
      </View>

      <View style={styles.containerBelowText}>
        <ScrollView>
          <View style={styles.AboutButton}>
            <Text style={styles.AboutButtonText}>About Us</Text>
          </View>

          <View style={styles.followscontainer}>
            <TouchableOpacity style={styles.followsButton} onPress={handleShowFollowers}>
              <Text style={styles.followButtonText}>{followerCount}</Text>
              <Text style={styles.followButtonText}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followingButton} onPress={handleShowFollowing}>
              <Text style={styles.followButtonText}>{followingCount}</Text>
              <Text style={styles.followButtonText}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Recent Reviews</Text>
          </View>
           {/* Optional: Carousel Slider */}

           <MyCarouselSlider />
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}>
              {/* <Text style={styles.rectangleText}>Bar Visit</Text>
              <Text style={styles.rectangleText}>{visitBarCount}/{totalBarCount}</Text> */}
            </View>
            {/* <View style={styles.rectangle}>
              <Text style={styles.rectangleText}>Relevant Stat</Text>
              <Text style={styles.rectangleText}>120</Text>
            </View>
            <View style={styles.rectangle}>
              <Text style={styles.rectangleText}>Relevant Stat</Text>
              <Text style={styles.rectangleText}>100</Text>
            </View>
            <View style={styles.rectangle}>
              <Text style={styles.rectangleText}>Relevant Stat</Text>
              <Text style={styles.rectangleText}>10</Text>
            </View> */}
          </View>

        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(MyProfileScreen);
