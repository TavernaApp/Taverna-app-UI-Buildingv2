import {React, useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Popup from '../components/CustomPopup';
import styles from '../css/styles';


const DOT = ({ navigation }) => {

  const [isReportAccountPopupVisible, setReportAccountPopupVisible] = useState(false);
  const [isBlockPopupVisible, setBlockPopupVisible] = useState(false);

  const openreportPopup = () => {
    setReportAccountPopupVisible(true);
  };

  const closereportPopup = () => {
    setReportAccountPopupVisible(false);
  };

  const openPopup = () => {
    setBlockPopupVisible(true);
  };

  const closePopup = () => {
    setBlockPopupVisible(false);
  };


    return (


      
            <View style={styles.DotContainer}>
                <TouchableOpacity style={styles.BlockButton} onPress={openPopup}>
                    <Text style={styles.blocktext}>Block Account</Text>
                </TouchableOpacity>
          <Popup visible={isBlockPopupVisible} onClose={closePopup} message="Are you sure you want to block this account?" />
                <TouchableOpacity style={styles.BlockButton} onPress={openreportPopup}>
                    <Text style={styles.reporttext}>Report Account</Text>
                </TouchableOpacity>
          <Popup visible={isReportAccountPopupVisible} onClose={closereportPopup} message="Are you sure you want to Report account?" />
            </View>

    
    );
};

export default DOT;