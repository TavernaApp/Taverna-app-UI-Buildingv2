// DetailScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../css/styles';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarPage from './BarPage';

const DetailScreen = ({ route, navigation }) => {
    const { navigate } = useNavigation();
    const { item } = route.params;
    const handleGoBack = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };
    return (
        <LinearGradient
            colors={['#312537', '#7440AE',"#7A4BAB"]} style={{ flex: 1 }}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 1 }}>

<View style={styles.containerDetailScreen}>
                {/* Image Container */}
                <TouchableOpacity onPress={handleGoBack} style={styles.imageContainer}>
                    <Image
                        source={item.imageUri}
                        style={styles.imageDetailScreen}
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




<BarPage/>




            {/* <View style={styles.FlatListRecentActivity}>

                <Text style={[styles.nameRecentActivity, { color: "black" }]}>
                    {item.name}
                </Text>

                <Text style={{ color: "black" }}>{item.price}</Text>
                <StarRating rating={item.rating} />
            </View> */}

        </LinearGradient>

    );
};

// const styles = StyleSheet.create({
  
// });
export default DetailScreen;
