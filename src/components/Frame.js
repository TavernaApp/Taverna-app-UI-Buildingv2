import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../css/styles';
import { ScrollView } from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

const Frame = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack(); 
  };


  return (
    

    <LinearGradient
    colors={['#312537', '#7440AE']}
    style={{ flex: 1 }}
    start={{ x: 1, y: 1 }}
    end={{ x: 0, y: 0 }}>
      <ScrollView>
              <View style={styles.FrameMainContainer}>
                
              <View style={styles.FrameThreeContainer}>
              <Image
          source={require('../assets/images/Eye.png')}
          style={styles.FrameThreeImage}
        />
        <Text style={styles.FrameText}>
            Visited
        </Text>
              </View>
              
              <View style={styles.FrameThreeContainer}>
              <Image
          source={require('../assets/images/Heart.png')}
          style={styles.FrameThreeImage}
        />
        <Text style={styles.FrameText}>
            Liked
        </Text>
              </View>

              <View style={styles.FrameThreeContainer}>
              <Image
          source={require('../assets/images/Framemap.png')}
          style={styles.Framemapimg}
        />
        <Text style={styles.FrameText}>
            My Bars
        </Text>
              </View>

              </View>

              <View style={styles.Framestarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Framestar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Framestar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Framestar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Framestar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Framestar}></Image>
              </View>

            <View style={styles.frametext$cont}>
                <Text style={styles.frametext$}>$</Text>
                <Text style={styles.frametext$}>$</Text>
                <Text style={styles.frametext$$}>$</Text>
            </View>

            <Text style={styles.FrameText}>Rated</Text>

      </ScrollView>
    </LinearGradient>
  );
};

export default Frame;