import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles'; // Importing styles from external CSS file
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@env';

const CreateCrawlsScreen = ({ navigation, route, userData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barIds, setBarIds] = useState([]);
  const [barNames, setBarNames] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [userRatingsTotal, setUserRatingsTotal] = useState([]);
  const [BarLocation, setBarLocation] = useState([]);
  const [barAddresses, setBarAddresses] = useState([]); // State to store bar addresses

  const [quantity, setQuantity] = useState(1);
  const [selectedBarIndex, setSelectedBarIndex] = useState(0); // Track selected bar index

  useEffect(() => {
    if (route.params?.newEntry) {
      const newBar = route.params.newEntry;
      // Check if the bar already exists
      if (!barIds.includes(newBar.id)) {
        setBarIds(prevBarIds => [...prevBarIds, newBar.id]);
        setBarNames(prevBarNames => [...prevBarNames, newBar.name]);
        setBarLocation(preBarLocation =>[...preBarLocation, newBar.place_id])
        setUserRatingsTotal(prevUserRatings => [
          ...prevUserRatings,
          newBar.userRatings || 0  // Ensure `userRatings` is always defined
        ]);
        setSelectedBarIndex(barIds.length); // Update based on new length
        fetchBarAddress(newBar.place_id);
      } else {
        console.log(`Bar with ID ${newBar.id} already exists.`);
      }
    }
  }, [route.params?.newEntry]);

  useEffect(() => {
    if (route.params?.newEntryUser) {
      console.log(route.params?.newEntryUser, "testing newentry");
      
      // Only add user if they are not already added
      if (!userIds.includes(route.params.newEntryUser.id)) {
        setUserIds(prevUserIds => [...prevUserIds, route.params.newEntryUser.id]);
        setUserNames(prevUserNames => [...prevUserNames, route.params.newEntryUser.username]);
        setUserRatingsTotal(prevUserRatingsTotal => [
          ...prevUserRatingsTotal,
          route.params.newEntryUser.user_ratings_total || 0, // Default to 0 if undefined
        ]);
      } else {
        console.log(`User with ID ${route.params.newEntryUser.id} already exists.`);
      }
    }
  }, [route.params?.newEntryUser]);
 // Function to fetch the address using the Google Places API
 const fetchBarAddress = async (placeId) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U`);
    if (response.data.status === 'OK') {
      const address = response.data.result.formatted_address;
      setBarAddresses(prevAddresses => [...prevAddresses, address]);
    } else {
      console.error('Failed to fetch address:', response.data.status);
    }
  } catch (error) {
    console.error('Error fetching address:', error.message);
  }
};
  // Function to delete a bar
  const handleDeleteBar = (index) => {
    setBarIds(prev => prev.filter((_, i) => i !== index));
    setBarNames(prev => prev.filter((_, i) => i !== index));
    setUserRatingsTotal(prev => prev.filter((_, i) => i !== index));
  };
  

  // Function to edit a bar (replace with a new selection)
  const handleEditBar = (index) => {
    // Navigate to BarIdEntry with the index of the bar to edit
    navigation.navigate('BarIdEntry', { editIndex: index });
  };  
  const handleGoBack = () => {
    
    navigation.navigate("My Profile");
  };

  const handleAddCrawl = async () => {
    try {
      if (!name || !description || barIds.length === 0 || userIds.length === 0) {
        Alert.alert('Error', 'Please fill all fields.');
        return;
      }

      console.log("Sending request with data:", { name, description, barIds, userIds });

      const response = await axios.post(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/crawls`, {
        name,
        description,
        barIds,
        userIds,
      }, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });

      console.log("Response from server:", response);

      if (response.status === 201) {
        console.log('Crawl created successfully:', response.data);
        setName('');
        setDescription('');
        setBarIds([]);
        setUserIds([]);
        setBarNames([]);
        setUserNames([]);
        navigation.navigate('Add To Crawl');
      } else {
        console.error('Failed to create crawl. Server responded with status:', response.status);
        Alert.alert('Error', 'There was a problem creating the crawl. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating crawl:', error.message);
      Alert.alert('Error', 'There was a problem creating the crawl. Please try again later.');
    }
  };

  const handlePlusPress = () => {
    navigation.navigate('BarIdEntry');
  };

  const handleUserPlusPress = () => {
    navigation.navigate('UserIdEntry');
  };

  const handleNewCrawl = () => {
    navigation.navigate('Add To Crawl');
  };

  const nextBar = () => {
    setSelectedBarIndex(prevIndex => (prevIndex + 1) % barNames.length);
  };

  const prevBar = () => {
    setSelectedBarIndex(prevIndex => (prevIndex - 1 + barNames.length) % barNames.length);
  };

  const selectedBar = {
    id: barIds[selectedBarIndex],
    name: barNames[selectedBarIndex],
    userRatings: userRatingsTotal[selectedBarIndex] || 0, // Default to 0 if undefined
    address: barAddresses[selectedBarIndex] || 'No address availabled', // Default message if no address
  };

  console.log("Bar IDs:", barIds);
  console.log("Bar Names:", barNames);
  console.log("User Ratings Total:", userRatingsTotal);

  return (
<LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient  colors={['#A079D0', '#C5A5EB']} 
      style={ styles.Incontainer2}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}  >
          <View style={styles.myconties}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.CancelBT}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleNewCrawl}>
              <Text style={styles.Rectatext}>New Crawl</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plus1Button} onPress={handleAddCrawl}>
              <Icon name="plus-circle" size={27} color="rgba(203, 175, 248, 1)" />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 10 }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Add Name"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
              onChangeText={text => setDescription(text)}
              value={description}
              placeholder="Enter Description"
              placeholderTextColor="#ccc"
            />
            <View style={styles.textInputContainer23}>
              <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
                value={barNames.join(', ')}
                placeholder="Add Entries"
                placeholderTextColor="#ccc"
                editable={false}
              />
              <TouchableOpacity style={styles.lusButt2} onPress={handlePlusPress}>
                <Icon name="plus-circle" size={30} color="rgba(112, 0, 190, 1)" />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.textInputContainer23}>
              <TextInput
                style={{ borderBottomWidth: 1, borderBottomColor: "white" }}
                value={userNames.join(', ')}
                placeholder="Users"
                placeholderTextColor="#ccc"
                editable={false}
              />
              <TouchableOpacity style={styles.lusButt2} onPress={handleUserPlusPress}>
                <Icon name="plus-circle" size={30} color="rgba(112, 0, 190, 1)" />
              </TouchableOpacity>
            </View> */}
            {/* Edit/Delete Options for Selected Bars */}
            {barNames?.map((barName, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'white', flex: 1 }}>{barName}</Text>
                {/* <TouchableOpacity onPress={() => handleEditBar(index)}>
                  <Icon name="edit" size={20} color="yellow" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => handleDeleteBar(index)} style={{ marginLeft: 10 }}>
                  <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}

            {/* Bar Details Section */}
            {barNames?.length > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
    <View style={{ flex: 1 }}>
    <Text style={{ color: 'white', fontWeight: 'bold' }}>{selectedBar.name}</Text>
     <Text style={{ color: 'white' }}>{selectedBar.address}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Adjust user ratings display */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <Icon
                        key={index}
                        name="star"
                        size={20}
                        color={index < selectedBar.userRatings ? "gray" : "gold"} // Gold for rated, gray for not rated
                      />
                    ))}
                     <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
            <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
            <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
                  </View>
        </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
    <TouchableOpacity
    onPress={prevBar}
        style={{
            backgroundColor: '#842AC5',
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
        }}>
        <Text style={{ color: 'white', fontSize: 24 }}>{'<'}</Text>
    </TouchableOpacity>
    <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 5 }}>
    {selectedBarIndex + 1} of {barNames.length} {/* Show the current index */}
    </Text>
        <TouchableOpacity
        onPress={nextBar}
        style={{
            backgroundColor: '#842AC5',
            borderRadius: 5,
            padding: 10,
            marginLeft: 5,
        }}>
        <Text style={{ color: 'white', fontSize: 24 }}>{'>'}</Text>
    </TouchableOpacity>
</View>
</View>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = state => ({
  userData: state.user.userData
});

export default connect(mapStateToProps)(CreateCrawlsScreen);
