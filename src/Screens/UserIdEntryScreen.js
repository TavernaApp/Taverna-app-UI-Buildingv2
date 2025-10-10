import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import _ from 'lodash';
import styles from '../css/styles';

const defaultImage = require('../assets/images/Rectangle-1210.png');

const UserIdEntryScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchData = useCallback(
    _.debounce(async (query) => {
      if (query.trim() !== '') {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/users/search?query=${query}`);
        
          if (response.data && Array.isArray(response.data)) {
            setSearchResults(response.data);
          } else {
            setSearchResults([]);
          }
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError('An error occurred while fetching data.');
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500), [] // Debounce delay of 500ms
  );

  useEffect(() => {
    fetchData(text);
  }, [text, fetchData]);

  const handleSelectUser = (userId) => {
    console.log(userId,"testing")
    navigation.navigate('New Crawls', { newEntryUser:  userId  });
  };

  const renderUserImage = (imageUrl) => {
    return imageUrl ? (
      <Image
        source={{ uri: imageUrl }}
        style={styles.IMGTss}
        onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)}
      />
    ) : (
      <Image
        source={defaultImage}
        style={styles.IMGTss}
      />
    );
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <View style={styles.Incontainer}>
        <View style={styles.searchconti}>
          <View style={styles.cancelbuttonActivity}>
            <TouchableOpacity onPress={handleGoBack}>
              <Text style={styles.CancelBT}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Finduserbox}>
            <Text style={styles.FinduserText}>Search Users</Text>
          </View>
        </View>

        <View style={styles.Findusercontainer}>
          <TextInput
            style={styles.Findinput}
            onChangeText={(input) => {
              setText(input);
              fetchData(input); // Call the debounced function
            }}
            value={text}
            placeholder="Search Users"
            placeholderTextColor="white"
          />

          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : error ? (
            <Text style={styles.findtext}>{error}</Text>
          ) : (
            <ScrollView>
              {searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <TouchableOpacity key={user.id} onPress={() => handleSelectUser(user)}>
                    <View style={styles.myaddcrawlcontainer}>
                      <View style={styles.imgaddcrawlcontainer}>
                        
                        {renderUserImage(user.profileImage)}
                        <Text style={styles.RBT}>{user.username}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.findtext}>No Results Found</Text>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default UserIdEntryScreen;
