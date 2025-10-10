import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { BASE_URL } from '@env'; // Ensure you have configured environment variables
import { updateUserProfileImage } from '../reducers/userReducer'; // Replace with your actual path
import { useIsFocused } from '@react-navigation/native'; // Assuming you're using React Navigation
import Icon from 'react-native-vector-icons/FontAwesome';

const ChangeProfileImageScreen = ({ navigation, userData, dispatch }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${userData?.user?.id}/profile`, {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        setProfileImage(response?.data?.profileImage);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    if (isFocused) {
      fetchProfileImage();
    }
  }, [isFocused, userData]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
        if (permissionStatus !== RESULTS.GRANTED) {
          const newPermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
          if (newPermissionStatus !== RESULTS.GRANTED) {
            console.log('Camera permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, handleImageResponse);
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      setProfileImage({ uri: asset.uri });
      saveImageLocally(asset.uri);
    }
  };

  const saveImageLocally = async (uri) => {
    try {
      const filename = uri.split('/').pop();
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${filename}`;
      await RNFS.copyFile(uri, destinationPath);
      console.log('Image saved locally:', destinationPath);
      uploadImage(destinationPath);
    } catch (error) {
      console.log('Error saving image locally:', error);
      setImageError('Error saving image locally');
    }
  };

  const uploadImage = async (uri) => {
    try {
      const filename = uri.split('/').pop();
      const imageData = await RNFS.readFile(uri, 'base64'); // Read file as base64 data

      const formData = new FormData();
      formData.append('profileImage', {
        uri: Platform.OS === 'android' ? `file://${uri}` : uri,
        name: filename,
        type: 'image/jpeg', // Adjust according to your image type
        data: imageData,
      });

      const token = userData?.token;
      const response = await axios.post(
        `${BASE_URL}/api/users/upload-profile-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Upload response:', response.data);

      // Optionally update local state or dispatch Redux action on successful upload
      // dispatch(updateUserProfileImage(response.data.imageUrl));
    } catch (error) {
      console.log('Error uploading image:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error setting up request:', error.message);
      }
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={{flex:1 , backgroundColor:"#2A0955"}}
    >
        <View style={{ position: 'absolute', top: '2%', right: '15%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '90%' }}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="chevron-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ fontWeight: '900', fontSize: 28, color:"white" }}>
            Profile Image
          </Text>
        </View>
      <View style={styles.container}>
        {profileImage && profileImage.uri ? (
          <Image
            source={{ uri: profileImage.uri }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/images/face.png')}
            style={styles.profileImage}
          />
        )}
        {imageError && (
          <Text style={styles.errorText}>{imageError}</Text>
        )}
        <Text style={{ fontWeight: '500', fontSize: 18,  color:"white"}}>{userData?.user?.username}</Text>
        <View style={{ flexDirection: 'row', marginLeft: '12%', marginVertical: '3%', }}>
          <TouchableOpacity onPress={selectImage}>
            <Text style={styles.changeImageText}>Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Text style={styles.takePhotoText}>
              <Icon name="camera" size={30} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'rgba(112, 0, 190, 1)',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  changeImageText: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: 0.5,
    borderRadius: 2,
    backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingHorizontal: '4%',
    paddingVertical: '1.5%',

  },
  takePhotoText: {
    // fontWeight: '700',
    // fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    // borderColor: 'rgba(192, 167, 216, 1)',
    // borderWidth: 0.5,
    // borderRadius: 2,
    // backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingHorizontal: '2%',
    paddingVertical: '1.5%',
    // marginHorizontal: '3%',
    // marginVertical: '3%',
  },
  errorText: {
    fontSize: 16,
    color: 'purple',
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  userData: state.user.userData, // Replace with your state selector for user data
});

export default connect(mapStateToProps)(ChangeProfileImageScreen);
