import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../css/styles';

const ProfileScreenTopBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tabs = ['My Profile', 'My TimeLine', 'My Crawls', 'My Saved'];
  const [activeTabIndex, setActiveTabIndex] = useState(-1);

  useEffect(() => {
    const tabIndex = tabs.indexOf(route.name);
    setActiveTabIndex(tabIndex >= 0 ? tabIndex : -1);
  }, [route]);

  const handleTabPress = (index) => {
    console.log('Tab pressed:', tabs[index], 'Active tab index:', activeTabIndex, 'Route name:', route.name);
    if (route.name !== tabs[index]) {
      console.log('Navigating to:', tabs[index]);
      navigation.navigate(tabs[index]);
    } else {
      setActiveTabIndex(index);
      console.log('Setting active tab:', tabs[index]);
    }
  };
  

  return (
    <View style={styles.Topbar}>      
      {tabs.map((tab, index) => (
        <TouchableOpacity key={index} onPress={() => handleTabPress(index)}>
          <Text style={[styles.Texts, index === activeTabIndex && styles.activeText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProfileScreenTopBar;
