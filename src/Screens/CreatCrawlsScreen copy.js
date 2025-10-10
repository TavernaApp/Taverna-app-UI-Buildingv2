import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../css/styles'; // Importing styles from external CSS file
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@env';

const CreateCrawlsScreen = ({ navigation, route, userData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [barIds, setbarIds] = useState([]);
  const [barNames, setBarNames] = useState([]); 
  const [userIds, setuserIds] = useState([]);
  const [userNames, setUserNames] = useState([]);
  
  // Quantity state
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (route.params?.newEntry) {
      setbarIds(prevbarIds => [...prevbarIds, route.params.newEntry.id]);
      setBarNames(prevBarNames => [...prevBarNames, route.params.newEntry.name]);
    }
  }, [route.params?.newEntry]);

  useEffect(() => {
    if (route.params?.newEntryUser) {
      console.log(route.params?.newEntryUser, "testing crawl page user");
      setuserIds(prevuserIds => [...prevuserIds, route.params.newEntryUser.id]);
      setUserNames(prevuserNames => [...prevuserNames, route.params.newEntryUser.username]);
    }
  }, [route.params?.newEntryUser]);

  const handleGoBack = () => {
    navigation.goBack();
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
        setbarIds([]);
        setuserIds([]);
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

  // Functions to manage quantity
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <LinearGradient
      colors={['rgba(116, 64, 174, 1)', 'rgba(49, 37, 55, 1)']}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient  colors={['#A079D0', '#C5A5EB']} // Adjust colors and opacity as needed
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
            <View style={styles.textInputContainer23}>
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
            </View>
            {/* New Section for Image and Location */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
    <View style={{ flex: 1 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Location Name</Text>
        <Text style={{ color: 'white' }}>Bar Name</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="star" size={20} color="gold" />
            <Icon name="star" size={20} color="gold" />
            <Icon name="star" size={20} color="gold" />
            <Icon name="star" size={20} color="gold" />
            <Icon name="star" size={20} color="gold" />
            <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
            <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
            <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
            <Text style={{ color: 'white', marginLeft: 5 }}>$</Text>
        </View>
    </View>
    
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
    <TouchableOpacity
        onPress={increaseQuantity}
        style={{
            backgroundColor: '#842AC5',
            borderRadius: 5,
            padding: 10,
            marginRight: 5,
        }}>
        <Text style={{ color: 'white', fontSize: 24 }}>{'<'}</Text>
    </TouchableOpacity>

    <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 5 }}>
        {quantity}
    </Text>

    <TouchableOpacity
        onPress={decreaseQuantity}
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
