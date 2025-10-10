import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
// import SearchIcon from "../assets/bottom-navigation-icons/search-icon.png";
import CustomTabIcon from "./CustomTabIcon";
import styles from "../css/styles";
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text, TouchableOpacity, PermissionsAndroid, Linking, Alert, Image } from 'react-native';

  // Create a custom header component
  const TopBarMap = () => {
  const Tab = createBottomTabNavigator();

    const navigation = useNavigation(); 

    const handleTabPress = (screenName) => {
      navigation.navigate(screenName);
    };
    
    return (
      <View style={styles.topBarContainer}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => handleTabPress('My Map')}>
            <Text style={styles.tab}>My Map</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('My Friends')}>
            <Text style={styles.tab}>My Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('My Popular')}>
            <Text style={styles.tab}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('All')}>
            <Text style={styles.tab}>All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={() => handleTabPress('Search')}>
            {/* <CustomTabIcon source={SearchIcon} /> */}
            <Icon name="search" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
export default TopBarMap