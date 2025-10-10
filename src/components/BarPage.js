import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../css/styles';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarPage = ({navigation}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{flex: 1}}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}>
      <ScrollView>
      <View style={styles.containerDetailScreen}>
                {/* Image Container */}
                <TouchableOpacity >
                    <Image
                        source={require('../assets/images/Rectangle-121000000.png')}
                        style={styles.BartopImage}
                    />
                   
                </TouchableOpacity>

                {/* Back Arrow Button */}
                <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainerDetailScreen}>
                    <Text style={styles.imageBackArrowDetailScreen}>
                        {/* {'<'} */}
                        <Icon name="chevron-left" size={18} color="white" />
                        </Text>
                </TouchableOpacity>
            </View>
        <View
          // colors={['rgba(116, 64, 174, 1)', 'rgba(49, 37, 55, 0)']}
          style={styles.containerBelowText}>
            <View style={styles.barpagetextstylecontainer}>
              <Text style={styles.barpagefirsttext}>THE NAME OF BAR/CLUB</Text>
              <Text style={styles.barpagesecondtext}>Websitelink.com</Text>
              <Text style={styles.barpagesecondtext}>971-696-6969</Text>
            </View>
            <View style={styles.barclockimgcontainer}>
                <View style={styles.barlocationimgcontainer}>
                <Image
          source={require('../assets/images/Location.png')}
          style={styles.Barclockimg}
       />
                  <Text style={styles.Barclocktext}>Location of the bar/club</Text>
                </View>
                <View style={styles.barlocationimgcontainer}>
                <Image
          source={require('../assets/images/Clock.png')}
          style={styles.Barclockimg}
       />
                  <Text style={styles.Barclocktext}>Open : Closes 1 am</Text>
                </View>
            </View>
          <View style={styles.reviewpluscontainer}>
            <View style={styles.conti}>
              <View style={styles.plusbuttonActivity}></View>
              <View style={styles.reviewcrec}>
                <Text style={styles.cCrecText}>Reviews</Text>
              </View>
              <TouchableOpacity style={styles.barpageplusButton}>
                <Icon name="plus" size={20} color="rgba(203, 175, 248, 1)" />
              </TouchableOpacity>
            </View>
          </View>
            <View style={styles.Barboxmaincont}>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
            </View>
            <View style={styles.Barboxmaincont}>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
                <View style={styles.Barboxcont}>
                <Image
          source={require('../assets/images/face.png')}
          style={styles.Barboximg}
       />
        <Text style={styles.Barboxtext}>User Name</Text>

        <View style={styles.Barstarcont}>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                 <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
                <Image
                  source={require('../assets/images/star.png')}
                  style={styles.Barstar}></Image>
              </View>

      </View>
            </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default BarPage;
