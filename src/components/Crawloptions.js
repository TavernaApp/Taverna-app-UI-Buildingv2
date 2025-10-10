import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../css/styles';

import LinearGradient from 'react-native-linear-gradient';

const Crawloptions = ({ navigation }) => {


    return (


        <LinearGradient
            colors={['#312537', '#7440AE']}
            style={{ flex: 1 }}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}>
            <View>
                <TouchableOpacity style={styles.BlockButton}>
                    <Text style={styles.blocktext}>Add to bar Crawl</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BlockButton}>
                    <Text style={styles.reporttext}>Delete Crawl</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    );
};

export default Crawloptions;