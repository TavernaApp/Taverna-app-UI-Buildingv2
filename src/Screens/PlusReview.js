import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StarRatingincreasesize from '../components/StarRatingincreasesize';
import StarRating from '../components/StarRating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from '../css/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { BASE_URL } from '@env';
import placeholderImage from '../assets/images/Rectangle-1206.png';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const PlusReview = ({ visible, onClose, userData }) => {
    const selectedBar = useSelector(state => state.another.selectedBar);
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5); // Default rating
    const [iconStates, setIconStates] = useState([false, false, false]); // For price tiers
    const [likes, setLikes] = useState(0); // State for likes
    const [isLiked, setIsLiked] = useState(false); // State to track like status
    const vicinity = selectedBar.vicinity || selectedBar.formatted_address;

    // Toggle price tier icons
    const toggleIconColor = (index) => {
        setIconStates(prevIconStates => {
            const newIconStates = [...prevIconStates];
            for (let i = 0; i < newIconStates.length; i++) {
                newIconStates[i] = i === index ? !newIconStates[i] : false; // Toggle clicked icon and reset others
            }
            return newIconStates;
        });
    };

    const handleSubmit = async () => {
        const priceTier = iconStates.reduce((acc, curr, index) => (curr ? index + 1 : acc), 0);

        // Validate input
        if (!text.trim()) {
            Alert.alert("Error", "Please write a review before submitting.");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/ratings`,
                {
                    rating,
                    comment: text,
                    userId: userData?.user?.id,
                    barId: selectedBar?.id,
                    priceTier,
                    likes // Include likes in the submission
                }
            );
            console.log('Review submitted successfully:', response.data);
            Alert.alert("Success", "Your review has been submitted successfully.", [{ text: "OK", onPress: () => onClose() }]);
            onClose(); // Close the modal on success
        } catch (error) {
            Alert.alert("Info", "You've already rated this bar.", [{ text: "OK", onPress: () => onClose() }]);
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
                        style={{ height: height * 0.15, width: width * 0.15 }} 
                        onError={() => console.log('Image Load Error')}
                    />
                );
            }
        }
        return (
            <Image
                source={placeholderImage}
                style={{ height: height * 0.12, width: width * 0.15 }} 
            />
        );
    };

    const handleHeartPress = () => {
        setIsLiked(prevLiked => {
            const newLikedStatus = !prevLiked; // Toggle like status
            setLikes(prevLikes => newLikedStatus ? prevLikes + 1 : Math.max(prevLikes - 1, 0)); // Increment or decrement likes
            return newLikedStatus;
        });
    };

    return (
        <View visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.Reviewplusparent}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    borderBottomColor: "white",
                    borderBottomWidth: 1,
                }}>
                    <TouchableOpacity onPress={onClose} style={{ padding: 10 }}>
                        <Icon name="chevron-left" size={18} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 20, textAlign: "center", flex: 1 }}>
                        Review
                    </Text>
                </View>

                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>{renderBarImage()}</View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "white" }} numberOfLines={1}>
    {selectedBar.name}
</Text>
<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
<Text style={{ color: 'white' }} numberOfLines={1}>
    {vicinity}
</Text> 
<View style={{ flex: 1 }} />

{/* Heart icon at the right */}
<TouchableOpacity onPress={handleHeartPress}>
    <Icon name="heart" size={20} color={isLiked ? "red" : "gray"} />
</TouchableOpacity>

</View>

<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
    <StarRating rating={rating} onStarPress={setRating} />
    <Text style={{ marginHorizontal: 5, color: "white" }}>|</Text>
    {iconStates.map((iconState, index) => (
        <TouchableOpacity key={index} onPress={() => toggleIconColor(index)}>
            <Icon name="dollar" size={15} color={iconState ? '#8A95A1' : 'white'} />
        </TouchableOpacity>
    ))}
    
    {/* This view takes up the space to push the heart icon to the right */}
   
</View>


                            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: "white", marginTop: 10 }}>
                                <View>
                                    <StarRatingincreasesize rating={rating} onStarPress={setRating} />
                                </View>
                                <Text style={{ marginRight: 20, color: "white", marginTop:10 }}>|</Text>
                                {iconStates.map((iconState, index) => (
                                    <TouchableOpacity key={index} onPress={() => toggleIconColor(index)} style={{ marginRight: 20, color: "white", marginTop:10 }}>
                                        <Icon name="dollar" size={20} color={iconState ? '#8A95A1' : 'white'} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    <TextInput
                        style={{ borderTopWidth: 1, borderTopColor: "white",color:"white", padding: 10, fontSize: width * 0.04, marginTop: 10 }}
                        onChangeText={setText}
                        value={text}
                        placeholder="Write a Review"
                        placeholderTextColor="white"
                        multiline
                    />
                    <View style={styles.underborderText}>
                        <TouchableOpacity style={{ backgroundColor: "#842AC5", alignSelf: "center", padding: 10, borderRadius: 10 }} onPress={handleSubmit}>
                            <Text style={styles.submiText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    userData: state.user.userData, // Assuming user data is stored under user.userData
});

export default connect(mapStateToProps)(PlusReview);
