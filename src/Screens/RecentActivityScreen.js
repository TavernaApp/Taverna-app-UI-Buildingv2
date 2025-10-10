import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from '../components/StarRating';
import styles from '../css/styles';
import { useNavigation } from '@react-navigation/native';
import image1 from '../assets/images/Rectangle-1206.png';
import image2 from "../assets/images/Rectangle-1212.png";
import image3 from "../assets/images/Rectangle-1210.png";
import image4 from "../assets/images/Rectangle-1208.png";
import Icon from 'react-native-vector-icons/FontAwesome';

const RecentActivity = ({ navigation }) => {
  const { navigate } = useNavigation();
  const data = [
    { id: 1, name: 'Bar Name', rating: 4,imageUri:image1, price: "566$$" },
    { id: 2, name: 'Bar Name', rating: 5,imageUri:image2, price: "566$$" },
    { id: 3, name: 'Bar Name', rating: 3,imageUri:image3, price: "566$$" },
    { id: 4, name: 'Bar Name', rating: 2,imageUri:image4, price: "566$$" },
    { id: 5, name: 'Bar Name', rating: 3,imageUri:image1, price: "566$$" },
    { id: 6, name: 'Bar Name', rating: 4,imageUri:image2, price: "566$$" },
    { id: 7, name: 'Bar Name', rating: 4,imageUri:image3, price: "566$$" },
    { id: 8, name: 'Bar Name', rating: 4,imageUri:image4, price: "566$$" },
    { id: 9, name: 'Bar Name', rating: 4,imageUri:image1, price: "566$$" },
    { id: 10, name: 'Bar Name', rating: 4,imageUri:image2, price: "566$$" },
    { id: 11, name: 'Bar Name', rating: 4,imageUri:image3, price: "566$$" },
    { id: 12, name: 'Bar Name', rating: 4,imageUri:image4, price: "566$$" },
  ];

  const handleImagePress = (item) => {
    console.log("Item clicked:", item);
    navigate('DetailScreen', { item });
  };
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  // Render item function for FlatList
  const renderItem = ({ item }) => {
    return (
     
      <TouchableOpacity style={styles.containerRecentActivity} 
      onPress={() => handleImagePress(item)}>
      
        <View style={styles.containerRecentActivity}>

          <View style={styles.imageRecentActivity}>
          <Image
            source={item.imageUri}
            style={styles.imageResizeRecentActivity}
            onError={(error) => console.error("Error loading image:", error)}
          
          />
          </View>
          <Text style={styles.nameRecentActivity}>{item.name}</Text>
          <StarRating rating={item.rating} />

          <Text style={styles.priceRecentActivity}>{item.price}</Text>

        </View>
        </TouchableOpacity>

    );
  };

  return (
    // #7A4BAB
    <LinearGradient
      colors={['#312537', 
      '#7440AE',
      '#7A4BAB'
    ]} style={{ flex: 1 }}
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
              Recent Activity</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          // renderItem={({ item, index }) => renderItem({ item, index, dataLength: data.length })}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3} // Display 4 items per row
          contentContainerStyle={styles.contentContainerStyleRecentActivity}
        />
      </View>
    </LinearGradient>
  );
};

export default RecentActivity;
