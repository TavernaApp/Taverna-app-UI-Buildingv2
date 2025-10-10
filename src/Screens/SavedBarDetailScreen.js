import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BarPage from './BarPage';
import styles from '../css/styles';
import axios from 'axios';
import { BASE_URL } from '@env';

// Import local image
import placeholderImage from '../assets/images/Rectangle-1206.png';
import SavedBarPage from './SavedBarPage';

const SavedBarDetailScreen = ({ userData }) => {
    const navigation = useNavigation();
    const selectedBar = useSelector(state => state.another.selectedBar);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [reportText, setReportText] = useState('');

    useEffect(() => {
        logVisit();
    }, []);

    const logVisit = async () => {
        try {
            await axios.post(`${BASE_URL}/api/bars/${selectedBar.id}/visit`, {}, {
                headers: {
                    Authorization: `Bearer ${userData?.token}`
                }
            });
            console.log('Visit successfully logged');
        } catch (error) {
            console.error('Error logging visit:', error);
        }
    };


    const handleGoBack = () => {
        navigation.navigate('Saved');
    };

    const handleModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setReportModalVisible(false);
    };

    const handleUnSave = async () => {
        try {
            // Save the bar
            await axios.delete(`${BASE_URL}/api/users/${userData?.user?.id}/saved-bars/${selectedBar.id}`, {
                barId: selectedBar.id // Assuming selectedBar has an 'id' property representing the bar's unique identifier
            });
            Alert.alert('Success', 'Bar unsaved successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to unsave bar. Please try again later.');
        } finally {
            handleCloseModal();
        }
    };

    const handleReport = () => {
        setReportModalVisible(true);
    };

    const handleReportConfirm = async () => {
        try {
            await axios.post(`${BASE_URL}/api/reportBar/${userData?.user?.id}/${selectedBar.id}`,
                {
                    reason: reportText
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData?.token}`
                    }
                }
            );
            Alert.alert('Success', 'Report submitted successfully!');
            setReportText('');
            handleCloseModal();
        } catch (error) {
            Alert.alert('Error', 'Failed to submit report. Please try again later.');
        }
    };

    const renderBarImage = () => {
        const photos = selectedBar?.photos ? (Array.isArray(selectedBar.photos) ? selectedBar.photos : []) : [];

        if (photos.length > 0) {
            const photoReference = photos[0].photo_reference;

            if (photoReference) {
                const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyB5K0ztT_lLhy2FVS_SNWgKS1lQuIBSz4U`;

                return (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.imageDetailScreen}
                        onError={() => console.log('Image Load Error')}
                    />
                );
            }
        }
        return (
            <Image
                source={placeholderImage}
                style={styles.imageDetailScreen}
            />
        );
    };
    
    

    return (
        <LinearGradient
            colors={['#312537', '#7440AE', "#7A4BAB"]}
            style={{ flex: 1 }}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 1 }}
        >
            <ScrollView>
                <View style={styles.imageContainer}>
                    {renderBarImage()}
                </View>
                <View style={styles.containerDetailScreen}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainerDetailScreen}>
                        <Icon name="chevron-left" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleModal} style={styles.bardots}>
                        <Icon name="ellipsis-h" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Assuming BarPage is a separate component */}
                <SavedBarPage />

                {/* Modal for Save and Report */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={handleUnSave} style={styles.modalButtons}>
                                <Text style={styles.modalButtonText}>UnSave</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleReport} style={styles.modalButtons}>
                                <Text style={styles.modalButtonText}>Report</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButtons}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal for Report Submission */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={reportModalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ textAlign: 'center', padding: '2%', fontWeight: '700' }}>Why are you reporting this bar?</Text>
                            <TextInput
                                style={styles.reportinput}
                                placeholder="Enter your reason"
                                value={reportText}
                                placeholderTextColor="#7440AE"
                                onChangeText={text => setReportText(text)}
                            />
                            <TouchableOpacity onPress={handleReportConfirm} style={styles.modalButtons}>
                                <Text style={styles.modalButtonText}>Submit Report</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButtons}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </LinearGradient>
    );
};

const mapStateToProps = (state) => ({
    userData: state.user.userData
});

export default connect(mapStateToProps)(SavedBarDetailScreen);
