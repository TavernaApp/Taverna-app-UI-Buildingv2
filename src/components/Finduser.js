import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../css/styles'; 
import { ScrollView } from 'react-native-gesture-handler';



const Finduser = ({ navigation }) => {
  const [text, setText] = useState('');

    const handleGoBack = () => {
      navigation.goBack(); 
    };
  return (
    <LinearGradient
    colors={['#312537', '#7440AE']}
    style={{ flex: 1 }}
    start={{ x: 1, y: 1 }}
    end={{ x: 0, y: 0 }}>
      <ScrollView>
      <View style={styles.Incontainer}>
      
          <View style={styles.conti}>
            <View style={styles.cancelbuttonActivity}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={styles.CancelBT}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Finduserbox}>
              <Text style={styles.FinduserText}>Find User</Text>
            </View>
            </View>

     <View style={styles.Findusercontainer}>
     <TextInput
              style={styles.Findinput}
              onChangeText={setText}
              value={text}
              placeholder="Search"
              placeholderTextColor="white"
              placeholderStyle={{ fontWeight: '700' }}
            />

    <Text style={styles.findtext}>Recent</Text>

        <TouchableOpacity style={styles.myfindusercontainer}>
        <View style={styles.imgusercontainer}>
        <Image
          source={require('../assets/images/face.png')}
          style={styles.myuserimg}
        />
          <Text style={styles.RBT}> @user</Text>
          </View>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.myfindusercontainer}>
        <View style={styles.imgusercontainer}>
        <Image
          source={require('../assets/images/face.png')}
          style={styles.myuserimg}
        />
          <Text style={styles.RBT}> @user</Text>
          </View>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.myfindusercontainer}>
        <View style={styles.imgusercontainer}>
        <Image
          source={require('../assets/images/face.png')}
          style={styles.myuserimg}
        />
          <Text style={styles.RBT}> @user</Text>
          </View>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.myfindusercontainer}>
        <View style={styles.imgusercontainer}>
        <Image
          source={require('../assets/images/face.png')}
          style={styles.myuserimg}
        />
          <Text style={styles.RBT}> @user</Text>
          </View>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.myfindusercontainer}>
        <View style={styles.imgusercontainer}>
        <Image
          source={require('../assets/images/face.png')}
          style={styles.myuserimg}
        />
          <Text style={styles.RBT}> @user</Text>
          </View>
        </TouchableOpacity>
       
      </View>
      </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Finduser;