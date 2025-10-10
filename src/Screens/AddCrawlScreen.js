import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

import styles from '../css/styles'; // Assuming you have your styles imported

const AddCrawlScreen = ({ navigation, userData }) => {
  const [text, setText] = useState('');
  const [crawlResults, setCrawlResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const isFocused = useIsFocused();

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleCrawlDetails = (crawl) => {
    navigation.navigate('Crawl Details', { crawl });
  };

  const fetchUserCrawlData = async () => {
    try {
      const response = await axios.get(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/crawls/user/${userData?.user?.id}`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`
        }
      });
      setCrawlResults(response.data); // Assuming response.data is an array of crawl results
    } catch (error) {
      console.error('Error fetching user crawl data:', error);
      // Handle error as needed, e.g., show an error message
    }
  };

  const searchCrawls = async () => {
    try {
      const response = await axios.get(`https://taverna-application-2ce1f26b8d1b.herokuapp.com/api/crawls/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`
        }
      });
      setSearchResults(response.data); // Assuming response.data is an array of crawl results
    } catch (error) {
      console.error('Error searching crawls:', error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserCrawlData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      searchCrawls();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}>
      <ScrollView>
        <View style={styles.Incontainer}>
          <View style={styles.contieses}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
                <Icon name="chevron-left" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.Rectatext}>New Crawl</Text>
            </View>
          </View>

          <View style={styles.Findusercontainer}>
            <TextInput
              style={styles.Findinput}
              onChangeText={(text) => {
                setText(text);
                setSearchTerm(text);
              }}
              value={text}
              placeholder="Search"
              placeholderTextColor="white"
              placeholderStyle={{ fontWeight: '700' }}
            />

            <Text style={styles.findtext}>Recent</Text>

            {(searchTerm.trim() === '' ? crawlResults : searchResults).map((crawl) => (
              <TouchableOpacity onPress={() => handleCrawlDetails(crawl)} style={styles.myaddcrawlcontainer} key={crawl.id}>
                <View style={styles.imgaddcrawlcontainer}>
                  <Text style={styles.RBT}>{crawl.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(AddCrawlScreen);
