import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedBar} from '../reducers/anotherReducer';
import StarRating from '../components/StarRating';
import CrawlLocation from './CrawlLocation';

const CrawlDetailsScreen = ({navigation, route, userData}) => {
  const selectedBar = useSelector(state => state.another.selectedBar);
  const dispatch = useDispatch();
  const {crawl} = route.params;
  const { latitude, longitude } = userData.selectedLocation || {}; 
  
  
  const handlegotobarDetailScreen = bar => {
    dispatch(setSelectedBar(bar));
    navigation.navigate('CrawlDetailBarDetails');
  };
  {crawl.Bars && crawl.Bars.length > 0 && (
    crawl.Bars.map(bar => {
        console.log(bar,"BARRRR");  // Log the bar object or any other value to the console
        return <Text key={bar.id}>abc</Text>;
    })
)}
  const handleGoBack = () => {
    navigation.navigate('My Crawls');
  };
  const participants = crawl?.Participants || [];
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
  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{flex: 1}}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}>
      <ScrollView>
        <View style={styles.Crawldetailtopcontainer}>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 2}}>
    <TouchableOpacity onPress={handleGoBack} style={{padding: 10}}>
        <Icon name="chevron-left" size={18} color="white" />
    </TouchableOpacity>
    <Text style={{color: "white", fontSize: 20, textAlign: "center", flex: 1, fontWeight:"bold"}}>
    {crawl ? crawl.name : 'Crawl Name Not Available'}
    </Text>
</View>

          <View style={styles.containercrawlxeta}>
     
          </View>

          <View style={styles.TRectSBS}>
            <View style={styles.Crawldetailedtopcontainer}>
              <TouchableOpacity style={styles.Crawledmyfollowcontainer}>
                <View style={styles.Crawlimgusercontainer}>
                  <Image
                    source={require('../assets/images/face.png')}
                    style={styles.Crawlmyuserimg}
                  />
                  {/* <Text style={styles.RBT}>{userData?.user?.username || 'unknown'}</Text>
                   */}
                  {crawl.participants && crawl.participants.length > 0 ? (
                    crawl.participants.map(participant => (
                      <Text key={participant.id} style={styles.CrawledsmallT}>
                        {participant.username
                          ? participant.username
                          : 'Crawl Participant Username'}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.CrawledsmallT}>
                      No participants available
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <Text style={styles.CrawlsmalledT}>
                {crawl && crawl.Bars ? crawl.Bars.length : 0} Bars
              </Text>
              <View style={styles.Crawldetailimgusercontainer}>
                <TouchableOpacity>
                  <Icon
                    name="bookmark"
                    style={styles.Crawldetailicon}
                    size={20}
                    color="rgba(192, 167, 216, 1)"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    name="bookmark"
                    style={styles.Crawldetailicon}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.thnBottomLine}></View>

          <Text style={styles.CrawledsmallT}>
            {crawl ? crawl.description : 'Crawl description Not Available'}
          </Text>
          {crawl.participants && crawl.participants.length > 0 ? (
            crawl.participants.map(participant => (
              <Text key={participant.id} style={styles.CrawledsmallT}>
                @
                {participant.username
                  ? participant.username
                  : 'Crawl Participant Username'}
              </Text>
            ))
          ) : (
            <Text style={styles.CrawledsmallT}>No participants available</Text>
          )}
          {/* Render images and names of bars */}
          <View style={styles.IMGTssCont}>
            {crawl &&
              crawl.Bars &&
              crawl.Bars.map((bar, index) => (
                <TouchableOpacity
                  onPress={() => handlegotobarDetailScreen(bar)}
                  key={index}
                  style={styles.barContainer}>
                  {renderBarImage(bar)}

                  <View>
                    <Text style={{marginLeft:'6%', color:"white", fontSize:12}}>
                      {bar.name.split(' ').slice(0, 2).join(' ')}
                    </Text>
                  
                  </View>
                 
              
                </TouchableOpacity>
              ))}
          </View>
          <CrawlLocation crawl={crawl}/>
        </View>
        
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(CrawlDetailsScreen);
