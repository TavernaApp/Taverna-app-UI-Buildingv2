import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../css/styles';


const DOT = ({ navigation }) => {


    return (


      
            <View style={styles.DotsContainer}>
                <TouchableOpacity style={styles.BlocksButton}>
                    <Text style={styles.blockstext}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BlocksButton}>
                    <Text style={styles.reportstext}>Delete</Text>
                </TouchableOpacity>
            </View>

    
    );
};

export default DOT;