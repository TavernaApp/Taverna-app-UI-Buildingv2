import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../css/styles';

const Customerreview = () => {

    return (
        <View style={styles.customerreview}>
        <Text style={styles.barpagecustomerreviewtext}>Customer Review</Text>
        <View style={styles.starbar}>
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
              </View>
              <Text style={styles.ratingbartext}> 4.7 Rating out of 5</Text>
        </View>
        <View style={styles.ratingbarcontainer}>
            <Text style={styles.ratingbartext}>5 Star</Text>
        <View style={styles.ratingbar}>
          <View style={styles.goldenratingbar1}></View>
        </View>
        <Text style={styles.ratingbartext}>84%</Text>
        </View>
        <View style={styles.ratingbarcontainer}>
            <Text style={styles.ratingbartext}>4 Star</Text>
        <View style={styles.ratingbar}>
        <View style={styles.goldenratingbar2}></View>
        </View>
        <Text style={styles.ratingbartext}>40%</Text>
        </View>
        <View style={styles.ratingbarcontainer}>
            <Text style={styles.ratingbartext}>3 Star</Text>
        <View style={styles.ratingbar}>
        <View style={styles.goldenratingbar3}></View>
        </View>
        <Text style={styles.ratingbartext}>15%</Text>
        </View>
        <View style={styles.ratingbarcontainer}>
            <Text style={styles.ratingbartext}>2 Star</Text>
        <View style={styles.ratingbar}>
        <View style={styles.goldenratingbar4}></View>
        </View>
        <Text style={styles.ratingbartext}>9%</Text>
        </View>
        <View style={styles.ratingbarcontainer}>
            <Text style={styles.ratingbartext}>1 Star</Text>
        <View style={styles.ratingbar}>
        <View style={styles.goldenratingbar5}></View>
        </View>
        <Text style={styles.ratingbartext}>5%</Text>
        </View>
        </View>
);
};

export default Customerreview;
