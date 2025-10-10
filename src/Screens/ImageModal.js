import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASE_URL } from '@env';
import styles from '../css/styles';

const ImageModal = ({ userData, navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleGoBack = () => {
    navigation.navigate('ChangeProfileImageScreen');
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
        const storagePermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        if (cameraPermission !== RESULTS.GRANTED) {
          const newCameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
          if (newCameraPermission !== RESULTS.GRANTED) {
            console.log('Camera permission denied');
          }
        }

        if (storagePermission !== RESULTS.GRANTED) {
          const newStoragePermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          if (newStoragePermission !== RESULTS.GRANTED) {
            console.log('Storage permission denied');
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

    launchImageLibrary(options, (response) => {
      console.log('launchImageLibrary response:', response);
      handleImageResponse(response);
    });
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, (response) => {
      console.log('launchCamera response:', response);
      handleImageResponse(response);
    });
  };

  const handleImageResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      setProfileImage({ uri: asset.uri });
      await saveImageLocally(asset.uri);
    }
  };

  const saveImageLocally = async (uri) => {
    try {
      const filename = uri.split('/').pop();
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${filename}`;
      await RNFS.copyFile(uri, destinationPath);
      console.log('Image saved locally:', destinationPath);

      return destinationPath;
    } catch (error) {
      console.log('Error saving image locally:', error);
      return null;
    }
  };

  const uploadImage = async (uri, BASE_URL) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', {
        uri,
        type: 'image/jpeg',
        name: 'profile_image.jpg',
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
      console.log(BASE_URL, uri);

      console.log('Upload response:', response.data);
    } catch (error) {
      console.log('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  return (
    <View style={styles.ImageModalparent}>
      <View style={styles.profileImagecontainer}>
        <TouchableOpacity style={styles.ImageModalbackiconContainer} onPress={handleGoBack}>
          <Icon name="chevron-left" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.ImageModalcentertext}>Profile Picture</Text>
        <View style={styles.ImageModaliconcontainer}>
          <TouchableOpacity style={styles.Cameraiconbutton} onPress={takePhoto}>
            <Icon style={styles.takeicon} name="camera" size={30} color="white" />
            <Text style={styles.changeImageText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Imageiconbutton} onPress={selectImage}>
            <Icon style={styles.takeicon} name="image" size={30} color="white" />
            <Text style={styles.changeImageText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImageModal;
