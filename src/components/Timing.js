import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../css/styles';
import { ScrollView } from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

const Timing = ({ navigation }) => {
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
              <View style={styles.TimingrectangleContainer}>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Monday</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>CLOSED</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Tuesday</Text>
                </View> 
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>CLOSED</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Wednessday</Text>
                </View>
                <View style={styles.Timingrectangle}> 
                <Text style={styles.rectangleText}>4:00pm - 1:00am</Text> 
                </View>          
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Thursday</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>4:00pm - 1:00am</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Friday</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>4:00pm - 1:00am</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Saturday</Text>
                </View> 
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>4:00pm - 1:00am</Text>
                </View>
                <View style={styles.Timingrectangle}>
                <Text style={styles.rectangleText}>Sunday</Text>
                </View>
                <View style={styles.Timingrectangle}> 
                <Text style={styles.rectangleText}>4:00pm - 1:00am</Text> 
                </View>          
              </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Timing;