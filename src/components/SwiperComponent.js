import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GradientBackground from './GradientBackground';

const data = [
  { id: 1, name: 'Image 1', image: require('../assets/images/Group-602.png'), rating: 4.5 },
  { id: 2, name: 'Image 2', image: require('../assets/images/Group-603.png'), rating: 3.8 },
  // Add more image data as needed
];

const SwiperComponents = () => {
  const handlePress = () => {
    console.log('Swiper component clicked!');
    // Add your logic here to open the component
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={handlePress}>
      <View style={{ flex: 1 }}>
        <Image source={item.image} style={{ width: '100%', height: 200 }} resizeMode="cover" />
        <View style={{ padding: 10 }}>
          <Text>{item.name}</Text>
          <Text>Rating: {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <GradientBackground>
    <View style={{ flex: 1 }}>
      {data.map(item => renderItem({ item }))}
    </View>
    </GradientBackground>

  );
};

export default SwiperComponents;
