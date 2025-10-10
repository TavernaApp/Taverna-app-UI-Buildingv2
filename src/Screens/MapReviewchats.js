import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { BASE_URL } from '@env';
import styles from '../css/styles';
import { useIsFocused } from '@react-navigation/native';

const MapReviewchats = ({ navigation, userData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownReviewId, setDropdownReviewId] = useState(null);
  const [dropdownReplyId, setDropdownReplyId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReplying, setIsReplying] = useState(false); 
  const [replyText, setReplyText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [replyParentId, setReplyParentId] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [editReviewId, setEditReviewId] = useState(null); // Track which review is being edited
  const [editReviewText, setEditReviewText] = useState(''); // State for editing review text
  const [editReplyId, setEditReplyId] = useState(null); // Track which reply is being edited
  const [editReplyText, setEditReplyText] = useState(''); // State for editing reply text
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const selectedBar = useSelector(state => state.another.selectedBar);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (selectedBar) {
      fetchReviews(selectedBar.id);
    }

  }, [selectedBar]);

  useEffect(() => {
    // Fetch reviews when screen is focused
    if (isFocused) {
      fetchReviews(selectedBar.id);
    }
  }, [isFocused, selectedBar]);
  useEffect(() => {
    // Set up a mechanism for real-time updates here (e.g., WebSocket or polling)
    const interval = setInterval(() => {
      if (selectedBar) {
        fetchReviews(selectedBar.id);
      }
    }, 5000); // Example: Poll every 5 seconds for updates

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [selectedBar]);
  const fetchReviews = async (barId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/reviews/${barId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('MapBarDetailScreen');
  };

  const handleThreeDots = (reviewId, replyId = null) => {
    setDropdownReviewId(reviewId);
    setDropdownReplyId(replyId);
    setShowDropdown(!showDropdown);
  };

  const handleSendReview = async () => {
    try {
      if (!reviewText || !selectedBar?.id) {
        console.error('Reply text and barId are required');
        return;
      }

      const token = userData?.token;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const requestBody = {
        comment: reviewText,
        barId: selectedBar.id,
      };
      const response = await axios.post(`${BASE_URL}/api/reviews/`, requestBody, { headers });
      // console.log('Review sent:', response.data);
      setReviewText('');
      fetchReviews(selectedBar.id);
    } catch (error) {
      console.error('Error sending review:', error);
    }
  };

  const handleSendReply = async () => {
    try {
      if (!replyText || !selectedBar?.id || !replyParentId) {
        console.error('Reply text, barId, and parentId are required');
        return;
      }
      const token = userData?.token;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        comment: replyText,
        barId: selectedBar.id,
        parentId: replyParentId,
      };

      const response = await axios.post(`${BASE_URL}/api/reviews/${replyParentId}/replies`, requestBody, { headers });

      // console.log('Reply sent:', response.data);
      setReplyText('');
      setIsReplying(false);
      setReplyParentId(null);
      fetchReviews(selectedBar.id);
    } catch (error) {
      console.error('Error sending reply:', error);
      if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'Parent review not found. Please refresh and try again.');
      } else {
        Alert.alert('Error', 'Failed to send reply. Please try again later.');
      }
    }
  };

  const toggleShowMore = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleTextLayout = (event, reviewId) => {
    const { lines } = event.nativeEvent;
    const canShowMore = lines.length > 2;
    setExpandedReviews(prev => ({
      ...prev,
      [`${reviewId}_canShowMore`]: canShowMore,
    }));
  };

  const handleEditReview = async () => {
    try {
      const token = userData?.token;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        comment: editReviewText,
      };

      const response = await axios.put(`${BASE_URL}/api/reviews/${editReviewId}`, requestBody, { headers });
      // console.log('Review edited:', response.data);

      fetchReviews(selectedBar.id);
      setEditReviewId(null); // Reset editReviewId state
      setEditReviewText(''); // Reset editReviewText state
      setShowDropdown(false); // Hide dropdown after operation
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const handleEditReply = async () => {
    try {
      const token = userData?.token;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        comment: editReplyText,
      };

      const response = await axios.put(`${BASE_URL}/api/reviews/replies/${editReplyId}`, requestBody, { headers });
      // console.log('Reply edited:', response.data);

      fetchReviews(selectedBar.id);
      setEditReplyId(null); // Reset editReplyId state
      setEditReplyText(''); // Reset editReplyText state
      setShowDropdown(false); // Hide dropdown after operation
    } catch (error) {
      console.error('Error editing reply:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = userData?.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`${BASE_URL}/api/reviews/${reviewId}`, { headers });
      // console.log('Review deleted:', response.data);

      fetchReviews(selectedBar.id);
      setShowDropdown(false); // Hide dropdown after operation
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      const token = userData?.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`${BASE_URL}/api/reviews/replies/${replyId}`, { headers });
      // console.log('Reply deleted:', response.data);

      fetchReviews(selectedBar.id);
      setShowDropdown(false); // Hide dropdown after operation
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (selectedBar) {
      await fetchReviews(selectedBar.id);
    }
    setRefreshing(false);
  };

  return (
    <View style={{backgroundColor:"#2A0955", flex:1}}
    >
      <View style={styles.Reviewchatscontainer}>
        <View style={styles.Reviewchatsconti}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={styles.ReviewchatsimageBackArrowRecentActivity}>
              <Icon name="chevron-left" size={18} color="white" />
            </Text>
          </TouchableOpacity>
          <View style={styles.Reviewchatsrecta}>
            <Text style={styles.ReviewchatsRectatext}>Reviews</Text>
          </View>
        </View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {reviews.map((review) => (
            <View key={review.id} style={styles.Reviewchats}>
              <View style={styles.reviewchatslowecontainer}>
                <View style={styles.upperinparentcont}>
                  <View style={styles.uppertopcontainer}>
                    <Image
                      source={require('../assets/images/face.png')}
                      style={styles.uppercontmyimg}
                    />
                    <Text style={styles.uppercontRBT}> {review.User.username}</Text>
                  </View>
                  {userData?.user.id === review.userId && (
                  <TouchableOpacity style={styles.uppercont3dots} onPress={() => handleThreeDots(review.id)}>
                    <Text style={styles.uppercont3text}>...</Text>
                  </TouchableOpacity>
                  )}
                  {showDropdown && dropdownReviewId === review.id && !dropdownReplyId && (
                    <View style={styles.dropdownMenu}>
                      <TouchableOpacity style={styles.dropdownItem} onPress={() => setEditReviewId(review.id)}>
                        <Text style={styles.dropdownItemText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.dropdownItem} onPress={() => handleDeleteReview(review.id)}>
                        <Text style={styles.dropdownItemText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View style={styles.texttouchcontainer}>
                  {editReviewId === review.id ? (
                    <View style={styles.editReviewContainer}>
                      <TextInput
                        style={styles.editReviewInput}
                        placeholder="Edit your review..."
                        onChangeText={setEditReviewText}
                        value={editReviewText}
                      />
                      <TouchableOpacity onPress={handleEditReview}>
                        <Text style={styles.editReviewButton}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setEditReviewId(null)}>
                        <Text style={styles.editReviewButton}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <Text
                        style={styles.loremtext}
                        onTextLayout={(event) => handleTextLayout(event, review.id)}
                        numberOfLines={expandedReviews[review.id] ? undefined : 2}>
                        {review.comment}
                      </Text>
                      {expandedReviews[`${review.id}_canShowMore`] && (
                        <TouchableOpacity onPress={() => toggleShowMore(review.id)}>
                          <Text style={styles.readmorebuttonText}>
                            {expandedReviews[review.id] ? "Show Less" : "Read More"}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                  {review.replies && review.replies.map(reply => (
                    <View key={reply.id} style={{ paddingVertical: '6%', paddingHorizontal: '12%' }}>
                      <View style={styles.upperinparentcont}>
                        <View style={styles.uppertopcontainer}>
                          <Image
                            source={require('../assets/images/face.png')}
                            style={styles.uppercontmyimg}
                          />
                          <Text style={styles.replyText}> {reply.User.username} replies you :</Text>
                        </View>
                        {userData?.user.id === reply.userId && (
                        <TouchableOpacity style={styles.uppercont3dots} onPress={() => handleThreeDots(review.id, reply.id)}>
                          <Text style={styles.uppercont3text}>...</Text>
                        </TouchableOpacity>
                        )}
                        {showDropdown && dropdownReplyId === reply.id && (
                          <View style={styles.dropdownMenu}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => setEditReplyId(reply.id)}>
                              <Text style={styles.dropdownItemText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleDeleteReply(reply.id)}>
                              <Text style={styles.dropdownItemText}>Delete</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                      {editReplyId === reply.id ? (
                        <View style={styles.editReplyContainer}>
                          <TextInput
                            style={styles.editReplyInput}
                            placeholder="Edit your reply..."
                            onChangeText={setEditReplyText}
                            value={editReplyText}
                          />
                          <TouchableOpacity onPress={handleEditReply}>
                            <Text style={styles.editReplyButton}>Save</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => setEditReplyId(null)}>
                            <Text style={styles.editReplyButton}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Text style={styles.replyText}> {reply.comment}</Text>
                      )}
                    </View>
                  ))}
                </View>
                <View style={styles.upperbottomcontainer}>
                  <View style={styles.uforium}>
                    {isReplying && replyParentId === review.id ? (
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                          style={styles.replyinput}
                          placeholder="Type your reply..."
                          onChangeText={setReplyText}
                          value={replyText}
                        />
                        <TouchableOpacity onPress={handleSendReply}>
                          <Text style={styles.SendText}>Send</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity onPress={() => {
                        setIsReplying(true);
                        setReplyParentId(review.id);
                      }}>
                        <Text style={styles.replyText}>Reply</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.ReviewChatInputcontainer}>
        <TextInput
          style={styles.ReviewChatInput}
          placeholder={editReviewId !== null ? "Edit your review..." : "Type your review..."}
          onChangeText={editReviewId !== null ? setEditReviewText : setReviewText}
          value={editReviewId !== null ? editReviewText : reviewText}
        />
        <TouchableOpacity onPress={editReviewId !== null ? handleEditReview : handleSendReview}>
          <Icon name={editReviewId !== null ? "save" : "paper-plane"} style={styles.SendChatText} size={18} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

export default connect(mapStateToProps)(MapReviewchats);
