// MyMapScreen.js
import React from 'react';
import { View, Text, FlatList, Image,TouchableOpacity  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from '../components/StarRating';
import styles from '../css/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const FromFriends = ({ navigation }) => {
  const data = [
    { id: 1, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 2, name: 'Bar Name', rating: 5, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 3, name: 'Bar Name', rating: 3, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 4, name: 'Bar Name', rating: 2, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 5, name: 'Bar Name', rating: 3, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 6, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 7, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 8, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 9, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 10, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 11, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
    { id: 12, name: 'Bar Name', rating: 4, image: require('../assets/images/Rectangle-1206.png'),price:"566$$"},
  
  ];
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  // Render item function for FlatList
  const renderItem = ({ item  }) => {
    return (
   <View style={styles.containerRecentActivity}>
  <View style={styles.imageRecentActivity}>
    <Image source={item.image} style={styles.imageResizeRecentActivity} 
   />
  </View>
  <Text style={styles.nameRecentActivity}>{item.name}</Text>
  <StarRating rating={item.rating} />
  
  {/* <Text style={styles.priceRecentActivity}>{item.price}</Text> */}
</View>   
    );
  };
  return (
    <LinearGradient
    colors={['#312537', '#7440AE',"#7A4BAB"]} style={{ flex: 1 }}
    start={{ x: 1, y: 1 }}
    end={{ x: 1, y: 1 }}
    >

    <View 
    style={styles.FlatListRecentActivity}>

    <View style={styles.topBarButtonRecentActivity}>

<TouchableOpacity onPress={handleGoBack}>

    <Text style={styles.imageBackArrowRecentActivity}>
      {/* {'<'} */}
                  <Icon name="chevron-left" size={18} color="white" />

      </Text>
</TouchableOpacity>

<TouchableOpacity 
onPress={handleGoBack}
style={styles.topBarButtonAlignmentRecentActivity}>
  <Text style={styles.topBarButtonTextRecentActivity}>
   From Friends</Text>
</TouchableOpacity>
</View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderItem({ item, index, dataLength: data.length })}
        keyExtractor={item => item.id.toString()}
        numColumns={3} // Display 4 items per row
        contentContainerStyle={styles.contentContainerStyleRecentActivity
        }
      />
    </View>
  </LinearGradient>
  );
};

export default FromFriends;
