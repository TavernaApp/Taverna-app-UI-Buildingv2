import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Modal
} from 'react-native';
import styles from '../css/styles';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { connect } from 'react-redux';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { CameraRoll } from 'react-native'; // Import CameraRoll module
import { BASE_URL } from '@env'; // Correct import for the base URL
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageModal from '../Screens/ImageModal';

const ChangeProfileImageScreen = ({ userData, navigation  }) => {
  // const [profileImage, setProfileImage] = useState(null);

  // useEffect(() => {
  //   requestCameraPermission();
  // }, []);
  
  const handleGoBack = () => {
    navigation.navigate('My Profile');
  };

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const permissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
  //       if (permissionStatus !== RESULTS.GRANTED) {
  //         const newPermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
  //         if (newPermissionStatus !== RESULTS.GRANTED) {
  //           console.log('Camera permission denied');
  //         }
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // };

  // const selectImage = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     quality: 1,
  //   };
  // };

  // const takePhoto = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     quality: 1,
  //   };

  //   launchCamera(options, (response) => {
  //     handleImageResponse(response);
  //   });
  // };


  // const saveImageLocally = async (uri) => {
  //   try {
  //     const filename = uri.split('/').pop(); // Extract filename from uri
  //     const destinationPath = `${RNFS.DocumentDirectoryPath}/${filename}`;
  //     await RNFS.copyFile(uri, destinationPath);
  //     console.log('Image saved locally:', destinationPath);

  //     // Save image to device's photos or album folder
  //     await CameraRoll.saveToCameraRoll(destinationPath);

  //     return destinationPath;
  //   } catch (error) {
  //     console.log('Error saving image locally:', error);
  //     return null;
  //   }
  // };

  // const uploadImage = async (uri, BASE_URL) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('profileImage', {
  //       uri,
  //       type: 'image/jpeg', // or image/png
  //       name: 'profile_image.jpg',
  //     });
  //     const token = userData?.token;
  //     const response = await axios.post(
  //       `${BASE_URL}/api/users/upload-profile-image`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(BASE_URL,uri);

  //     console.log('Upload response:', response.data);
  //   } catch (error) {
  //     console.log('Error uploading image:', error);
  //     Alert.alert('Error', 'Failed to upload image. Please try again.');
  //   }
  // };

  const Username = userData?.user?.username;

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const handleImageModal = () => {
    setIsImageModalVisible(true);
  };
  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
  };

  return (
    <LinearGradient
      colors={['#312537', '#7440AE']}
      style={{flex: 1}}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}>
    <View style={styles.profileImagecontainer}  onPress={handleImageModal}>
           <TouchableOpacity style={styles.profileImagebackiconContainer} onPress={handleGoBack}>
          <Icon name="chevron-left" size={25} color="white" />
        </TouchableOpacity>
      <View>
        <Image
          source={ require('../assets/images/face.png')
            // profileImage
            //   ? profileImage
            //   : require('../assets/images/face.png')
          }
          style={styles.profileImageScreen}
        />
      </View>
      <TouchableOpacity style={styles.takePhotoText} onPress={handleImageModal}>
        {/* <Text style={styles.takePhotoText}>Take Photo</Text> */}
        <Icon style={styles.takePhotoicon} name="camera" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.ImageModalimageText}>{Username}</Text>
        {/* <Text style={styles.ImageModalsubtext}>@user</Text> */}
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={handleCloseImageModal}
      >
        <ImageModal onClose={handleCloseImageModal} />
      </Modal>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  clearUserData: () => dispatch(clearUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfileImageScreen);
