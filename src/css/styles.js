import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
const screenWidth = width;

const styles = StyleSheet.create({
  /////////////////////////////////change profile image //////////////////////////////////////////
  scrollViewContent: {
    padding: 20, // Example padding, adjust as needed
    alignItems: 'center', // Center align content horizontally
  },
  carouselContainer: {
    maxHeight: wp('100%'),
    // marginTop: wp('12'),
  },

  zoomControls: {
    position: 'absolute',
    bottom: '20%',
    right: '5.7%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  zoomButton: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    marginBottom: 5,
  },

  recenterButton: {
    position: 'absolute',
    bottom: '11%',
    right: '5.7%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderRadius: '50',
    padding: 10,
  },

  ImageModalimageText: {
    bottom: hp('7'),
    fontFamily: 'Roboto Flex',
    // fontSize: 27,
    fontSize: wp('8.5'),
    textAlign: 'center',
    color: 'white',
    // top: 33,
    // paddingVertical: hp("2"),
    // top: wp('8'),
  },
  ImageModalsubtext: {
    bottom: hp('7'),
    fontFamily: 'Roboto Flex',
    // fontSize: 13,
    fontSize: wp('3.2'),
    color: 'white',
    textAlign: 'center',
    // top: 27,
    // top: wp('6.7'),
  },

  ImageModalbackiconContainer: {
    right: wp('40'),
    bottom: hp('20'),
  },

  ImageModalcentertext: {
    // right: wp("20"),
    color: 'white',
    bottom: hp('23.5'),
    fontSize: 16,
    fontWeight: '700',
  },

  ImageModalparent: {
    width: wp('100'),
    height: hp('26'),
    top: hp('76'),
    backgroundColor: '#312537',
    borderTopRightRadius: wp('10'),
    borderTopLeftRadius: wp('10'),
  },

  profileImagebackiconContainer: {
    right: wp('38'),
    bottom: hp('14'),
  },

  profileImagecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('26'),
    marginVertical: hp('16'),
    height: hp('50%'), // 6% of the screen's height
    width: wp('50%'),
  },
  profileImageScreen: {
    // left: wp("3"),
    height: hp('24%'), // 6% of the screen's height
    width: wp('47%'),
    borderRadius: wp('38'),
    // marginBottom: wp("4"),
  },
  changeImageText: {
    // left: wp("6"),
    bottom: hp('20'),
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    marginTop: wp('1.7'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
  
    // paddingHorizontal: wp('2%'), // Assuming wp() calculates a percentage
    width: wp('26%'), // Assuming wp() calculates a percentage
    paddingVertical: hp('0.5%'),
  },
  ImageModaliconcontainer: {
    flexDirection: 'row',
  },
  Imageiconbutton: {
    // marginVertical: hp('8%'),
    marginHorizontal: wp('6%'),
  },
  Cameraiconbutton: {
    marginBottom: hp('16%'),
    marginHorizontal: wp('6%'),
  },

  takePhotoText: {
    left: wp('19'),
    bottom: hp('10'),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
   
    width: wp('18%'), // Assuming wp() calculates a percentage
    height: hp('8.5%'), // Assuming wp() calculates a percentage
    paddingVertical: hp('1%'),
  },

  takeicon: {
    bottom: hp('20'),
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: hp('1%'),
    // paddingHorizontal: wp('1%'),
  },

  takePhotoicon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: hp('1%'),
    // paddingHorizontal: wp('1%'),
  },
  uploadButtonText: {
    bottom: hp('36'),
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    // marginTop: wp("1.7"),
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: wp('0.5%'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderRadius: wp('1.5%'), // Assuming wp() calculates a percentage
    // paddingHorizontal: wp('2%'), // Assuming wp() calculates a percentage
    width: wp('28%'), // Assuming wp() calculates a percentage
    paddingVertical: hp('0.5%'),
  },

  iconContainer: {
    left: wp('80'),
    bottom: hp('6.8'),
  },
  backiconContainer: {
    left: wp('8'),
    top: hp('6'),
  },
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',  // Align the modal to the bottom of the screen
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Dark background for the modal
  },
  bottomModalContent: {
    backgroundColor: "#B490DE",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1, // Allows the ScrollView to grow and take up available space
    justifyContent: 'center', // Centers the content vertically
    paddingHorizontal: 20, // Adds horizontal padding to ensure content doesn’t touch the edges
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: wp('6%'), // 5% of the screen's width
    marginBottom: hp('2%'), // 2% of the screen's height
    padding: hp('2%'),
    fontFamily: 'Paytone One',
    fontWeight: '900',
    color: '#E1C8FB',
  },
  title: {
    fontSize: wp('5%'), // Dynamically scale font size
    marginBottom: hp('2%'),
    fontFamily: 'Paytone One',
    fontWeight: '900',
    color: '#E1C8FB',
  },
  input: {
    height: hp('6%'), // 6% of the screen's height Signup
    width: wp('90%'), // 90% of the screen's width
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    marginBottom: hp('2%'), // 2% of the screen's height
    paddingHorizontal: wp('2%'), // 2% of the screen's width
    borderRadius: wp('2%'), // 12% of the screen's width (to make it round)
    fontFamily: 'Paytone One',
    fontSize: wp('4%'), // 4% of the screen's width
    color: 'gray',
    paddingLeft: wp('5%'), // 5% of the screen's width
  },
  reportinput: {
    height: hp('6%'), // 6% of the screen's height
    width: '100%', // 90% of the screen's width
    borderWidth: 1,
    borderColor: '#CBAFF8',
    backgroundColor: '#CBAFF8',
    marginBottom: '4%', // 2% of the screen's height
    paddingHorizontal: '2%', // 2% of the screen's width
    // borderRadius: wp('12%'), // 12% of the screen's width (to make it round)
    fontFamily: 'Paytone One',
    fontSize: wp('4%'), // 4% of the screen's width
    color: '#7440AE',
    paddingLeft: wp('5%'), // 5% of the screen's width
  },
  // Add a new style for when input is focused
  inputFocused: {
    backgroundColor: '#fff', // Background color when focused
    color: '#000', // Text color when focused
  },

  text: {
    color: 'white',
    marginBottom: 0,
    fontFamily: 'Paytone One',
  },
  texthighlight: {
    color: '#7000BE',
    marginBottom: 0,
    fontFamily: 'Paytone One',
  },
  heading: {
    fontFamily: 'Paytone One',
    fontSize: wp('6%'), // 8% of the screen's width
    fontWeight: '900',
    lineHeight: hp('6%'), // 6% of the screen's height
    letterSpacing: 0.02,
    textAlign: 'center',
    marginBottom: hp('2%'), // 2% of the screen's height
    color: '#CBAFF8',
  },
  LoginBtn: {
    backgroundColor: '#7000BE',
    fontSize: wp('6%'), // 6% of the screen's width
    width: wp('90%'), // 50% of the screen's width
    borderRadius: wp('2%'), // 12% of the screen's width (to make it round)
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6%'), // 6% of the screen's height
    marginBottom: hp('3%'), // 3% of the screen's height
    borderWidth: 2,
    borderColor: '#7000BE', // Add border color if needed
  },
  image: {
    width: wp('80%'), // Adjust width to a percentage of the screen's width
    height: hp('20%'), // Adjust height as a percentage of the screen's height
    resizeMode: 'contain', // This ensures the image maintains its aspect ratio
    marginBottom: hp('2%'), // Add some spacing below the image
  },
  buttonContainer: {
    marginTop: hp('2%'), // 2% of the screen's height
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Adjust width as per your layout
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },

  buttonWrapper: {
    width: wp('80%'), // 50% of the screen's width
    height: hp('7%'), // 6% of the screen's height
    borderRadius: wp('12%'), // 12% of the screen's width (to make it round)
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'), // 3% of the screen's height
    borderWidth: 1,
    borderColor: '#7000BECC', // Add border color if needed
  },
  buttonText: {
    color: 'white',
    fontSize: wp('6%'), // 4% of the screen's width
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  //////////////////////////////////     TopBar NavBar css         ///////////////////////////////////////////
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    // paddingHorizontal: '5%', // Relative padding
    paddingVertical: '2%', // Relative padding
    paddingLeft: '2%', // Relative padding
    // marginHorizontal: '4%', // Relative padding
    // backgroundColor: 'black',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#7000BE',
    borderRadius: wp('3%'), // Adjusted for visual appearance
    // paddingHorizontal: '2%', // Relative padding
    paddingVertical: '1.5%', // Relative padding
    width: '80%', // Allow tabs container to take up available space
  },
  tabButton: {
    flex: 1, // Each button takes equal space
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    color: '#fff',
    marginHorizontal: '2%', // Relative margin
    fontSize: 16, // Adjusted for readability
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#7000BE',
    borderRadius: wp('12%'),
    width: '11%',
    height: '100%',
  },
  searchBar: {
    color: '#fff',
  },
  // ---------------------------------------------End------------------------------------------------------------
  // ==============================================popup==================================================
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: wp('90'),
    padding: wp('5'),
    backgroundColor: '#7440AE',
    borderRadius: wp('2.5'),
    alignItems: 'center',
  },
  popupText: {
    marginBottom: hp('1'),
    textAlign: 'center',
    color: '#CBAFF8',
    fontWeight: 'bold',
  },
  popupbuttonContainer: {
    flexDirection: 'row',
    marginTop: hp('3'),
  },
  popupButton: {
    flex: 1,
    padding: wp('2'),
    backgroundColor: '#CBAFF8',
    borderRadius: wp('2'),
    alignItems: 'center',
  },
  popupButtonText: {
    color: 'white',
  },
  // ---------------------------------------------End------------------------------------------------------------
  // ==============================================Carousel Slider==================================================

  containerCarouselSlider: {
    flex: 1,
    position: 'relative',
  },
  itemContainerCarouselSlider: {
    // backgroundColor:'yellow',
    width: wp('34%'), // 25% of the screen width
    height: wp('100%'),
    // width: wp('25%'), // 25% of the screen width
    paddingHorizontal: wp('1%'),
    paddingVertical: wp('1%'),
    // paddingVertical: hp('1%'), // 1% of the screen height
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: hp('3%'), // 3% of the screen height
  },
  imageCarouselSlider: {
    width: '100%',
    // height: 130,
    height: wp('45%'),
    borderRadius: 8,
  },
  textContainerCarouselSlider: {
    // marginTop: 5,
    marginTop: hp('1%'),
    // alignItems: 'left',
  },
  movieNameCarouselSlider: {
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'left',
    color: '#FFFFFF',
  },
  textMilesAway: {
    color: 'white',
    fontFamily: 'Sora',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  iconsSetting: {
    flexDirection: 'row', // Change to row for horizontal alignment
    alignItems: 'center', // Center icons vertically
    marginTop: 5, // Optional spacing above icons
  },
  iconsSettings: {
    flexDirection: 'row', // Change to row for horizontal alignment
    alignItems: 'center', // Center icons vertically
    marginTop: 5, // Optional spacing above icons
    marginHorizontal: '10%', // Optional spacing above icons
  },
  iconsSet: {
    flexDirection: 'row', // Change to row for horizontal alignment
    alignItems: 'center', // Center icons vertically
    marginHorizontal: '5%', // Optional spacing above icons
  },
  // rating: {
  //   fontSize: 12,
  //   color: 'gray',
  //   textAlign: 'center',
  // },
  // paginationContainerCarouselSlider: {
  //   position: 'absolute',
  //   bottom: 10,
  //   alignSelf: 'center',
  // },
  arrowButtonCarouselSlider: {
    position: 'absolute',
    zIndex: 1,
    // backgroundColor: '#7000BE',
    justifyContent: 'center',
    color: '#C0A7D8',
    // borderColor: '#C0A7D8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 0,
    // borderWidth: 3,
    margin: 10,
  },
  prevButtonCarouselSlider: {
    left: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  nextButtonCarouselSlider: {
    right: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },

  buttonTextArowCarouselSlider: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#C0A7D8',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  carouselContentContainer: {
    paddingLeft: 0,
  },
  topContainerCarouselSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonCarouselSlider: {
    // paddingHorizontal: 35,
    paddingVertical: 4,
    // backgroundColor: "#7000BE",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 6,
    borderColor: '#C0A7D8',
    // borderWidth: 3
    width: '60%',
  },
  buttonTextCarouselSlider: {
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  // ==============================================END Carousel Slider==================================================
  // ================================================ RecentActivityScreen =============================================
  topBarButtonRecentActivity: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginHorizontal: '4%',
    marginVertical: '3%',
  },
  topBarActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  topBarButtonAlignmentRecentActivity: {
    // flex: 1,
    marginRight: '40%',
  },
  imageBackArrowRecentActivity: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#C0A7D8',
    // textAlign: 'left',
    // justifyContent: 'left',
    borderColor: '#C0A7D8',
    fontWeight: '700',
    // width: wp('8%'),
    borderRadius: wp('1%'),
    // backgroundColor: "#7000BE",
    marginRight: '30%',
    // paddingVertical: hp('1'),
    // marginHorizontal: wp('2'),
  },
  imagesRecentActivity: {
    width: '100%',
    height: hp('20%'),
    borderRadius: wp('1.5%'),
  },
  topBarButtonTextRecentActivity: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: wp('6%'),
  },

  containerRecentActivity: {
    paddingHorizontal: hp('0.1%'), // 2% of the screen's width
    paddingVertical: wp('1%'), // 2% of the screen's height
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  FlatListRecentActivity: {
    // marginTop: hp('3%'),
    backgroundColor: '#2A0955',
    paddingBottom: hp('5.5%'),
    // height:'100%',
  },
  contentContainerStyleRecentActivity: {
    // paddingHorizontal: wp('1%'),
    // paddingTop: hp('3%'),
    paddingBottom: hp('10%'),
  },

  imageRecentActivity: {
    borderColor: '#A178BC',
    borderStyle: 'solid',
    borderTopWidth: wp('1%'),
    borderLeftWidth: wp('1%'),
    borderRadius: wp('3%'),
    marginHorizontal: 'auto',
    height: hp('20%'),
    width: hp('15%'),
    // height: hp('15%'),
    // width: hp('11%'),
  },

  imageResizeRecentActivity: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: wp('3%'),
  },
  nameRecentActivity: {
    fontSize: wp('4%'),
    color: 'white',

    fontFamily: 'Roboto Flex',
    fontWeight: '500',
    marginHorizontal: wp('1%'),
  },
  priceRecentActivity: {
    fontSize: wp('2.5%'),
    color: 'white',
    fontFamily: 'Roboto Flex',
    fontWeight: '700',
    marginTop: hp('0.3%'),
    marginHorizontal: wp('1%'),
  },

  // ================================================ END RecentActivityScreen =============================================
  // ======================================StarRating=======================================================================
  imageStarRating: {
    width: hp('1.0%'),
    height: hp('1.3%'),
    // marginTop: hp('0.3'),
    marginHorizontal: wp('1%'),
  },
  imageStarRatings: {
    width: hp('4.0%'),
    height: hp('3%'),
    // marginTop: hp('0.3'),
    marginHorizontal: wp('1%'),
  },
  imageStarRatingCenter: {
    // width: hp('1.0%'),
    // height: hp('1.3%'),
    // marginTop: hp('0.3'),
    marginHorizontal: wp('0.2%'),
  },
  // ======================================StarRatingincreasesize=======================================================================
  StarRatingincreasesize: {
    width: hp('4%'),
    height: hp('4%'),
    marginTop:10
  },
  // ======================================END StarRating=======================================================================
  // =========================================Start DetailScreen ===============================================================
  containerDetailScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginHorizontal: '10%',
    top: '2.5%',
    position: 'absolute',
    // flex: 1,
    // alignItems: 'center',
  },
  buttonContainerDetailScreen: {
    // borderRadius: 20,
  },
  iconDetailScreen: {
    // zIndex: 2,
    fontSize: wp('5%'), // Adjust size as needed
    color: 'white',
  },
  imageDetailScreen: {
    width: '100%',
    height: hp('42%'),
  },
  imageBackArrowDetailScreen: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#C0A7D8',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    width: wp('8%'),
    borderRadius: wp('1%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    marginHorizontal: wp('2%'),
  },
  imageContainer: {
    width: '100%',
    // height: hp('28%'), // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },

  // =========================================END DetailScreen ===============================================================

  // ============================================== My Friends Section ============================================================
  containerMyFriends: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  childrenMyFriends: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  TextMyFriends: {
    color: 'white',
    fontSize: 18,
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: '700',
    textAlign: 'left',
    marginLeft: 10,
  },
  seeMoreContainerMyFreinds: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  arrowIconMyFriends: {
    marginLeft: 5, // Adjust spacing between icon and text
  },
  horizontalLineMyFriends: {
    height: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  // ============================================== My Friends END Section ============================================================
  // ===================== Freind Detail Screen========================

  MyimageFreindContainer: {
    // bottom: wp('20'),
    height: hp(5),
    marginVertical: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:wp('20')
  },

  Freindfollowscontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: '2%',
  },

  FreindfollowsButton: {
    // backgroundColor: '#7440AE',
    // borderRadius: wp('0.5%'), // Assuming wp() calculates a percentage
    paddingHorizontal: wp('1%'), // Assuming wp() calculates a percentage
    width: wp('30%'), // Assuming wp() calculates a percentage
    paddingVertical: wp('1.5%'), // Assuming wp() calculates a percentage
    marginHorizontal: wp('1.5%'), // Assuming wp() calculates a percentage
    // marginBottom: hp('2.5%'), // Assuming wp() calculates a percentage
    // borderColor: 'rgba(192, 167, 216, 1)',
    // borderWidth: wp('0.5%'), // Assuming wp() calculates a percentage
  },
  FreindfollowingButton: {
    // backgroundColor: '#7440AE',
    // borderRadius: wp('0.5%'), // Assuming wp() calculates a percentage
    paddingHorizontal: wp('1%'), // Assuming wp() calculates a percentage
    width: wp('30%'), // Assuming wp() calculates a percentage
    paddingVertical: wp('1.5%'), // Assuming wp() calculates a percentage
    marginHorizontal: wp('1.5%'), // Assuming wp() calculates a percentage
    // marginBottom: hp('2.5%'), // Assuming wp() calculates a percentage
    // borderColor: 'rgba(192, 167, 216, 1)',
    // borderWidth: wp('0.5%'), // Assuming wp() calculates a percentage
  },

  FreindFreindfollowButton: {
    paddingHorizontal: '1%', // Assuming wp() calculates a percentage
    width: '35%', // Assuming wp() calculates a percentage
    paddingVertical: '1%', // Assuming wp() calculates a percentage
    marginHorizontal: '35%', // Assuming wp() calculates a percentage
    marginTop: '6%', // Assuming wp() calculates a percentage
   
  },

  imageFriendScreen: {
    width: wp('27%'), // 100% of the screen's width
    // height: hp('5%'), // 50% of the screen's height
    borderRadius: 15,
    // resizeMode: 'contain',
  },
  // ===================== Freind End Detail Screen========================
  // =====================umer code =========================================
  // =======================================timelinecomponent==================================================
  upperText: {
    fontFamily: 'Roboto Flex',
    fontSize: 25,
    Top: 10,
    color: 'white',
  },
  circleimage: {
    top: 40,
    width: 100,
    resizeMode: 'contain',
  },
  profoimage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outbox: {
    right: 3,
    width: 365,
    height: 550,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    marginHorizontal: 'auto',
    elevation: 5,
  },
  //////////////////////////////////////CreatecrawlComponent////////////////////////////////////////////////////

  textInputContainer23: {
    // right: wp('55'),
    // flexDirection: 'row',
    // // position: 'relative',
    // width: '80%',
    // // marginBottom: hp(''),
  },
  lusButt2: {
    bottom: '28%',
    left: '84%',
    // paddingHorizontal: wp('1.1'),
    // paddingVertical: wp('1'),
    // // width: wp('10'),
    // // height: hp('6'),
    // zIndex: 1,
    position: 'absolute',
    // // marginTop: 17,
    // // left: 140,
  },
  textIC: {
    marginTop: '16%',
  },
  textInput: {
    fontWeight: '500',
    width: '90%',
    backgroundColor: '#CBAFF8',
    borderRadius: wp('30'),
    borderWidth: 1.2,
    paddingHorizontal: '5%',
    marginHorizontal: '5%',
    marginVertical: '4%',
  },
  plus1Button: {},
  CancelBT: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'rgba(255, 255, 255, 1)',
  },
  conties: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignItems: 'center',
    marginVertical: '4%',
  },
  contieses: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
    alignItems: 'center',
    marginVertical: '4%',
  },
  cancelbuttonActivity: {
    // left: 90,
    // alignItems: 'center',
    // paddingHorizontal: '5%',
    // paddingVertical: '1%',
    // top: '5%',
  },
  crec: {
    borderWidth: 2,
    borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius: 5,
    width: wp('32'),
    height: hp('5'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
    left: wp('12'),
    // marginVertical:wp('23'),
    top: wp('8'),
  },
  cCrecText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center', // Horizontal alignment
    textAlignVertical: 'center', // Vertical alignment
  },
  /////////////////////////////////////settingComponent/////////////////////////////////////////////////////
  RBTD: {
    fontSize: 18,
    fontWeight: '500',
    color: 'red',
  },
  RBT: {
    fontSize: 18, // Font size of the text
    fontWeight: '700', // Font weight (bold)
    color: 'white', // Text color
    textAlign: 'center', // Horizontal text alignment
    textAlignVertical: 'center', // Vertical text alignment (centers vertically)
    paddingHorizontal: '4%',
  },

  RBTunfollow: {
    fontSize: 18, // Font size of the text
    fontWeight: '700', // Font weight (bold)
    color: 'white', // Text color
    textAlign: 'center', // Horizontal text alignment
    textAlignVertical: 'center', // Vertical text alignment (centers vertically)
  },
  RB: {
    width: wp('84'),
    height: hp('5'),
    paddingHorizontal: wp('1.5'),
    marginVertical: hp('1.2'),
    alignSelf: 'center',
    flexDirection: 'row', // Set flex direction to row
    alignItems: 'center', // Center content vertically
  },

  recta: {
    // bottom: hp('3'),// Align content horizontally
  },

  Rectatext: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    // borderColor: 'rgba(192, 167, 216, 1)',
    // borderWidth: wp('0.5'),
    // borderRadius: wp('2'),
    // backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingHorizontal: '6%',
    paddingVertical: '1.5%',
  },

  conti: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginHorizontal: '14%',
    marginVertical: '4%',
  },

  searchconti: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '67%',
    alignItems: 'center',
    marginVertical: '4%',
  },

  Incontainer: {
    width: '100%',
    height: hp('105%'),
    borderTopLeftRadius: wp('7.6'),
    borderTopRightRadius: wp('7.6'),
   // top: '12%',
    backgroundColor: '#2A0955',
  },
  Incontainer2: {
    width: '100%',
    height: hp('105%'),
    borderTopLeftRadius: wp('7.6'),
    borderTopRightRadius: wp('7.6'),
    top: '12%',
  },
  SettingIncontainer: {
    // right: wp('1.4'),
    width: '100%',
    height: hp('90%'),
    borderTopLeftRadius: wp('7.6'),
    borderTopRightRadius: wp('7.6'),
    // top: 90,
    top: '15%',
    // marginHorizontal: 'auto',
    // elevation: wp('0.2'),
    backgroundColor: '#2A0955',
    // bottom: wp('11'),
  },
  /////////////////////////////////////////ProfileScreenScreen///////////////////////////////////////////
  Topbar: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderRadius: wp('3%'), // Adjusted for visual appearance
    // paddingHorizontal: '2%', // Relative padding
    paddingVertical: '1.5%', // Relative padding
    marginVertical: '2.5%', // Relative margin
    width: '90%',
    borderWidth: wp('0.2'),
    borderColor: 'rgba(192, 167, 216, 1)',
  },

  Texts: {
    color: 'white',
    fontWeight: '500',
  },
  activeText: {
    color: '#896BA8', // Change color as per your requirement
    fontWeight: '900', // or any other style
  },

  MytopBarButtonRecentActivity: {
    position: 'sticky',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '1%', // 1% of the screen's height
    alignItems: 'center',
    marginHorizontal: '5%',
    // height:'4%',
    // backgroundColor:"black",
  },

  MyimageBackArrowRecentActivity: {
    fontSize: wp('8.5%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'white',
    textAlign: 'center',
    // justifyContent: 'center',
    borderColor: '#C0A7D8',
    fontWeight: '700',
    width: '8%',
    borderRadius: wp('1%'),
  },
  MyimageFrontArrowRecentActivity: {
    // fontSize: wp('9%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'white',
    borderColor: '#C0A7D8',
    fontWeight: 'bold',
    // height: hp('9%'),
    // textAlign: 'center', // Center horizontally
    // textAlignVertical: 'center', // Center vertically
    // width: hp('7'),
    borderRadius: wp('1%'),
  },

  bardots: {
    // fontSize: wp('9%'),
    fontWeight: '700',
    fontFamily: 'Roboto',
    // color: 'white',
    // bottom: hp('24.2%'), // Adjust as needed
    // left: wp('40%'),
    // borderColor: '#C0A7D8',
    // fontWeight: 'bold',
    // height: hp('9%'),
    // textAlign: 'center', // Center horizontally
    // textAlignVertical: 'center', // Center vertically
    // width: hp('7'),
    // borderRadius: wp('1%'),
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#7440AE',
    padding: '5%',
    borderRadius: wp('2%'),
    width: '80%',
  },
  modalButtons: {
    padding: '3%',
    borderRadius: wp('1%'),
    marginBottom: '5%',
    backgroundColor: '#CBAFF8',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#7440AE',
    fontSize: wp('4%'),
    fontWeight: '900',
  },
  modalButtonsText: {
    color: 'red',
    fontSize: wp('4%'),
    fontWeight: '900',
  },

  MyimageContainer: {
    // bottom: wp('20'),
    // height:hp(10),
    width: '100%',
    marginBottom: '9%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:wp('20')
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Example styling
    // backgroundColor:'black',
  },
  // profileImage: {
  //   top: wp('9'),
  //   resizeMode: 'contain',
  // },
  myprofileImage: {
    top: wp('9'),
    resizeMode: 'contain',
  },
  imageText: {
    fontFamily: 'Roboto Flex',
    // fontSize: 27,
    fontSize: wp('5.5'),
    textAlign: 'center',
    color: 'white',
    // top: 33,
    // paddingVertical: hp("1"),
    // top:'4%',
  },
  subtext: {
    fontFamily: 'Roboto Flex',
    // fontSize: 13,
    fontSize: wp('3.2'),
    color: 'white',
    textAlign: 'center',
    // top: 27,
    top: wp('6.7'),
  },

  rectangleContainer: {
    flexDirection: 'column',
    // flexWrap: 'wrap',
    // alignItems:'center',
    justifyContent: 'center',
    // paddingHorizontal: wp('2'),
    marginVertical: '10%',
  },
  rectangle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // borderBottomWidth: wp('0.6'),
    // borderBottomColor: 'white',
    //   backgroundColor:'black',
    // borderColor: 'rgba(192, 167, 216, 1)',
    // borderRadius: wp('1.5'),
    width: '90%',
    // height: '9%',
    // backgroundColor: 'rgba(112, 0, 190, 1)',
    marginVertical: '3%',
    textAlignVertical: 'center',
    // top: '6%',
    marginHorizontal: '3%',
  },
  rectangleText: {
    // fontSize: 18,
    fontSize: wp('4.3'),
    color: '#FFFFFF',
    textAlign: 'center',
    // textAlignVertical: 'center',
  },
  containerMyCarouselSlider: {
    position: 'relative',
  },
  itemContainerMyCarouselSlider: {
    width: wp('25%'), // 25% of the screen width
    paddingHorizontal: wp('1%'),
    paddingVertical: hp('1%'), // 1% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'), // 3% of the screen height
  },
  MyimageCarouselSlider: {
    width: '100%',
    // height: 130,
    height: wp('31.5'),
    // borderRadius: 8,
    borderRadius: wp('2'),
  },
  textContainerMyCarouselSlider: {
    // marginTop: 5,
    marginTop: wp('1.2'),
    alignItems: 'center',
  },
  movieNameMyCarouselSlider: {
    // fontSize: 14,
    fontSize: wp('3.4'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },

  MycarouselContentContainer: {
    paddingLeft: 0,
  },

  MytopContainerCarouselSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  FlatListRecentActivity1: {
    margin: 0,
    // backgroundColor: "#2A0955",
  },

  containerBelowText: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: wp('7.6'),
    borderTopRightRadius: wp('7.6'),
    elevation: wp('0.2'),
    backgroundColor: '#2A0955',
  },
  containerBelowText2: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: wp('7.6'),
    borderTopRightRadius: wp('7.6'),
    elevation: wp('0.2'),
    backgroundColor: '#7A4BAB',
  },
  followButton: {
   
    width: '30%', // Assuming wp() calculates a percentage
    paddingHorizontal: '1%', // Assuming wp() calculates a percentage
    paddingVertical: '1.5%', // Assuming wp() calculates a percentage
    // marginLeft: '35%', // Assuming wp() calculates a percentage
    marginHorizontal: '35%', // Assuming wp() calculates a percentage
    marginTop: '5%',
  },

  AboutButton: {
    alignItems: 'center',
    marginVertical: '8%',
  },
  AboutButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },

  followscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '10%',
  },

  followsButton: {
    alignItems: 'center',
  },
  followingButton: {
    alignItems: 'center',
  },

  followButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: wp('4%'), // Assuming wp() calculates a percentage
    fontWeight: '700',
  },
  // imageWrapper: {
  //   padding: 20,
  //   padding: 20,
  //   alignItems: 'center',
  // },
  // bottomImage: {
  //   width: 150,
  //   height: 150,
  //   resizeMode: 'contain',
  // },
  // inImage: {
  //   marginBottom: 0,
  //   padding: 0,
  // },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: '7%',
    marginVertical: wp('7'),
    // marginHorizontal: '27%',
    marginHorizontal: wp('30'),
    // marginBottom: '9%',
    marginBottom: wp('9%'),
  },
  circle: {
    borderWidth: wp('0.5'),
    width: 'auto',
    height: 'auto',
    // borderRadius: 27,
    borderRadius: wp('8'),
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 15,
    marginHorizontal: wp('3.6'),
    borderColor: 'rgba(192, 167, 216, 1)',
  },
  circleText: {
    // fontSize: 13,
    fontSize: wp('3.2'),
    color: 'white',
    top: wp('14.5'),
    // right: 132,
    right: wp('32'),
  },
  circleText1: {
    fontSize: wp('3.2'),
    color: 'white',
    // top: 60,
    top: wp('14.5'),
    // right: 62,
    right: wp('15'),
  },
  innerCircle: {
    // width: 50,
    width: wp('12'),
    // height: 50,
    height: wp('12'),
    // borderRadius: 20,
    borderColor: 'rgba(192, 167, 216, 1)',
  },
  profileIcon: {
    // width: '100%',
    // width: wp('12'),
    // height: '100%',
    // height: wp('12'),
    // transform: [{rotateY: '180deg'}],
    // right: 3,
    left: wp('3'),
    top: hp('1'),
  },
  profileIcon1: {
    // width: '90%',
    // width: wp('11'),
    // height: '85%',
    // height: wp('10'),
    // left: wp('0.5'),
    textAlign: 'center',
    fontSize: wp(9.5),
  },
  reviewButton: {
    paddingHorizontal: '1%', // Assuming wp() calculates a percentage
    paddingVertical: '1%',
    marginHorizontal: '30%',
    width: '40%',
  
    alignItems: 'center',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  ///////////////////////////////////profilescreenend/////////////////////////////////////////////////////

  ///////////////////////////////////Timeline/////////////////////////////////////////////////////

  MyimageContainer2: {
    marginBottom: wp('16'),
    bottom: wp('4'),
    // top: wp('8'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  MainItemCont: {
    top: wp('6'),
    marginBottom: wp('4'),
  },


  bigT: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },

  smallT: {
    fontWeight: '700',
    fontSize: 12,
    color: 'white',
  },

  BRC: {
    marginHorizontal: wp('4'),
  },

  BRR: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },

  IMGTs: {
    width: wp('18'),
    height: wp('22'),
    borderRadius: wp('2'),
  },

  IMGCont: {
    borderTopColor: 'rgba(161, 120, 188, 1)',
    borderLeftColor: 'rgba(161, 120, 188, 1)',
    borderTopWidth: wp('0.6'),
    borderLeftWidth: wp('0.6'),
    borderRadius: wp('2'),
    // width:wp('2'),
  },

  MainCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
  },

  ibsCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // stars: {
  //   display: 'flex',
  //   flexDirection: 'row',
  // },

  star5: {
    paddingVertical: wp('2%'),
  },

  ///////////////////////////////////Save/////////////////////////////////////////////////////

  savecontainer: {
    top: wp('1.5'),
  },

  ///////////////////////////////////Follow/////////////////////////////////////////////////////

  myfollowcontainer: {
    // width: 308,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    // height: 35,
    // height: hp('5'),
    borderWidth: wp('0.5'),
    borderRadius: wp('2'),
    borderColor: 'rgba(192, 167, 216, 1)',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    marginVertical: '2%',
    marginHorizontal: '5%',
  },

  myuserimg: {
    width: wp('6'),
    height: hp('3.5'),
    resizeMode: 'contain',
  },
  imgusercontainer: {
    flexDirection: 'row',
  },

  /////////////////////////////////Dot//////////////////////////////////

  DotContainer: {
    height: wp('40.5'),
    //
  },
  BlockButton: {
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderRadius: wp('1.5'),
    paddingHorizontal: wp('1'),
    width: wp('92%'),
    paddingVertical: wp('1.5'),
    marginLeft: '4%',
    marginTop: wp('3'),
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: wp('0.5'),
  },

  reporttext: {
    color: '#FB0202',
    fontWeight: '700',
  },

  blocktext: {
    color: 'white',
    fontWeight: '700',
  },

  ////////////////////////////////////////Finduser//////////////////////////

  cancel: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'white',
    textAlign: 'center',
    // justifyContent: 'center',
    borderColor: '#C0A7D8',
    fontWeight: '700',
    width: wp('20%'),
    borderRadius: wp('1%'),
  },

  Findusercontainer: {
    marginBottom: '100%',
  },

  findtext: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    paddingVertical: '4%',
  },

  Findinput: {
    width: '90%',
    borderWidth: wp('0.5'),
    borderRadius: wp('2'),
    borderColor: 'rgba(192, 167, 216, 1)',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    marginVertical: '1.5%',
    marginHorizontal: '5%',
    color:"white"
  },

  Finduserbox: {
    // width: wp('32'),
    // height: hp('5'),
    // left: wp('9'),
    // marginVertical:wp('23'),
    // top: wp('8.5'),
  },
  FinduserText: {
    // lineHeight: 30,
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    // textAlign: 'center',
  },

  myfindusercontainer: {
    width: '90%',
    borderWidth: wp('0.5'),
    borderRadius: wp('2'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    marginVertical: '1.5%',
    marginHorizontal: '5%',
    opacity:0.8
  },

  ///////////////////////////////Addcrawl/////////////////////
  myconties: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // marginHorizontal: '12%',
    alignItems: 'center',
    marginVertical: '4%',
  },
  addcrawlbox: {
    borderWidth: 2,
    borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius: 5,
    width: wp('32'),
    height: hp('5'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
    left: wp('10'),
    // marginVertical:wp('23'),
    top: wp('8'),
  },
  addcrawlText: {
    lineHeight: 30,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
  },

  myaddcrawlimg: {
    width: wp('15'),
    height: hp('12'),
    resizeMode: 'contain',
  },
  imgaddcrawlcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '6%',
    paddingHorizontal: '2%',
    // height:hp('10'),
  },

  myaddcrawlcontainer: {
    // width: 308,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '90%',
    // height: 35,
    // height: '10%',
    borderWidth: wp('0.5'),
    borderRadius: wp('2'),
    borderColor: 'rgba(192, 167, 216, 1)',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    // paddingVertical: '1%',
    paddingHorizontal: '2%',
    marginVertical: '1%',
    marginHorizontal: '5%',
  },

  //////////////////Crawls////////////////////////////////////

  Crawltopcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // height: hp('5'),
    paddingVertical: wp('1'),
    paddingHorizontal: wp('2'),
    top: '6%',
    // marginHorizontal: wp('2'),
  },

  CrawlbigT: {
    fontSize: wp('3%'), // Assuming wp() calculates a percentage
    fontWeight: '700',
    color: 'white',
    paddingHorizontal: '1.6%',
    paddingVertical: '1.3%',
    textAlign: 'center', // Horizontal center alignment
    textAlignVertical: 'center', // Vertical center alignment
  },

  CrawlsmallT: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
    // backgroundColor: '#7000BE',
    paddingHorizontal: wp('1.1'),
    paddingVertical: wp('1.5'),
    // borderWidth: wp('0.5'),
    // borderRadius: wp('1.5'),
    // borderColor: '#C0A7D8',
    textAlign: 'center', // Horizontal center alignment
    textAlignVertical: 'center', // Vertical center alignment
  },

  Crawlmyfollowcontainer: {
    width: '50%',
    // height: hp('5'),
    // borderWidth: wp('0.5'),
    // borderRadius: wp('1.5'),
    // borderColor: 'rgba(192, 167, 216, 1)',
    // backgroundColor: 'rgba(112, 0, 190, 1)',
    paddingHorizontal: wp('2'),
    marginVertical: hp('4.5'),
    // marginHorizontal: wp('2'),
    // justifyContent: 'left',
    alignItems: 'center',
  },

  IMGTssCont: {
    // width: 308,
    flexDirection: 'row',
    // justifyContent:'space-between',
    width: '100%',
    // height: 35,
    height: hp('17'),
    // paddingVertical: wp('1'),
    // paddingHorizontal: wp('2'),
    marginVertical: '3%',
    marginHorizontal: '2%',
  },

  IMGTss: {
    width: wp('22'),
    marginHorizontal: wp('1'),
    height: wp('25'),
    borderRadius: wp('2'),
  },

  thinBottomLine: {
    width: '90%',
    marginHorizontal: '5%',
    borderColor: '#C0A7D8',
    borderWidth: wp('0.6'),
  },
  ///////////////////////////////////crawldetail/////////////////////////////////////////////////////
  Crawldetailedtopcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    // height: hp('5'),
    // paddingVertical: wp('1'),
    // paddingHorizontal: wp('2'),
    marginHorizontal: '5%',
    marginVertical: '4%',
    alignItems: 'center',
    // top: hp('01'),
  },
  Crawldetailtopcontainer: {
    // bottom: wp('11%'), // Assuming wp() calculates a percentage
    top: hp('15%'), // Assuming hp() calculates a percentage
    width: '100%',
    height: hp('120'),
    borderTopLeftRadius: wp('7.6%'), // Assuming wp() calculates a percentage
    borderTopRightRadius: wp('7.6%'), // Assuming wp() calculates a percentage
    marginHorizontal: 'auto',
    elevation: wp('0.2'), // Assuming wp() calculates a percentage
    backgroundColor: '#2A0955',
  },
  containercrawlxeta: {
   
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
  },
  CrawldetailedbigT: {
    top: hp('4.8%'),
    height: hp('5%'),
    fontSize: wp('4%'),
    fontWeight: '900',
    color: 'white',
    marginHorizontal: wp('5%'), // Assuming wp() calculates a percentage
    // backgroundColor: '#7000BE',
    paddingHorizontal: wp('1.6%'), // Assuming wp() calculates a percentage
    paddingVertical: wp('1.3%'), // Assuming wp() calculates a percentage
    // borderWidth: wp('0.5%'), // Assuming wp() calculates a percentage
    // borderRadius: wp('1.5%'), // Assuming wp() calculates a percentage
    // borderColor: '#C0A7D8',
  },
  CrawldetailbigT: {
    fontSize: 18, // Assuming wp() calculates a percentage
    fontWeight: '900',
    color: 'white',
    // marginHorizontal: '5%',
    textAlign: 'center',
    // marginTop: '1%',
  },

  Crawldetailimgusercontainer: {
    flexDirection: 'row',
  },
  Crawldetailicon: {
    paddingHorizontal: wp('1%'),
  },

  CrawlsmalledT: {
    fontSize: wp('3.2%'),
    fontWeight: '700',
    color: 'white',
  },
  CrawledsmallT: {
    // textAlign:'center',
    fontSize: wp('2.8%'), // Assuming wp() calculates a percentage
    fontWeight: '700',
    color: 'white',
    paddingHorizontal: wp('5%'), // Assuming wp() calculates a percentage
    paddingVertical: wp('1.5%'), // Assuming wp() calculates a percentage
  },

  Crawlmyuserimg: {
    width: wp('6'),
    height: hp('4.4'),
    resizeMode: 'contain',
    marginVertical: wp('0.1'),
  },

  Crawlimgusercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  Crawledmyfollowcontainer: {
    // width: 308,
    // flexDirection:'row',
    // justifyContent:'space-between',
    // width: wp('24'),
    // height: 35,
    // height: hp('5'),
    // borderWidth: wp('0.5'),
    // borderRadius: wp('1.5'),
    // borderColor: 'rgba(192, 167, 216, 1)',
    // backgroundColor: 'rgba(112, 0, 190, 1)',
    // paddingVertical: wp('0.5'),
    // paddingHorizontal: wp('2'),
    // top: hp('4.8'),
    // marginHorizontal: wp('2'),
  },

  IMGesCont: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },

  IMGes: {
    width: '22%',
    marginHorizontal: '1%',
    marginVertical: '1%',
    height: wp('25'),
    borderRadius: wp('2'),
  },

  thnBottomLine: {
    width: '90%',
    marginHorizontal: '5%',
    borderColor: 'white',
    borderWidth: wp('0.3'),
    // top: hp('8'),
  },
  mapiMage: {
    marginVertical: '4%',
    width: '100%',
    height: hp('50'),
  },

  ////////////////////////////////////////Timing///////////////////////////////

  TimingrectangleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: wp('2'),
    marginVertical: wp('20'),
    // alignItems:'center',
  },
  Timingrectangle: {
    borderWidth: wp('0.6'),
    borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius: wp('1.5'),
    width: wp('38'),
    height: wp('9.7'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
    marginBottom: wp('2.5'),
  },

  ////////////////////////////////////Frame//////////////////////////////////

  FrameMainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  FrameThreeContainer: {
    marginHorizontal: wp('4'),
    marginVertical: hp('4'),
    width: wp('23'),
    height: hp('12'),
    backgroundColor: '#7000BE',
    borderWidth: wp('0.6'),
    borderColor: '#C0A7D8',
    borderRadius: wp('1.5'),
  },

  FrameThreeImage: {
    marginHorizontal: wp('3.5'),
    marginVertical: hp('1.2'),
    width: wp('15'),
    height: wp('10'),
  },

  Framemapimg: {
    marginHorizontal: wp('3.5'),
    marginVertical: hp('0.5'),
    // width: wp('15'),
    // height: wp('10'),
  },

  FrameText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#B490DE',
  },

  frametext$: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    color: '#B490DE',
  },

  frametext$$: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
  },

  frametext$cont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  Framestarcont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  Framestar: {
    width: wp('16'),
    height: hp('7'),
  },

  //=========================================Reviewchatcomponent=============================================//
  Reviewchatscontainer: {
    // right: wp('1.4'),
    width: '100%',
    height: '100%',
    borderTopLeftRadius: wp('7.6'),
    borderTopRightRadius: wp('7.6'),
    // top: 90,
    top: '10%',
    paddingBottom: '4%',
    // marginHorizontal: 'auto',
    // elevation: wp('0.2'),
    backgroundColor: '#2A0955',
    // bottom: wp('11'),
  },
  Reviewchatsconti: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: '24%',
    marginVertical: '4%',
  },
  ReviewchatstopBarButtonRecentActivity: {
    position: 'sticky',
    // backgroundColor: 'rgba(112, 0, 190, 1)',
    width: wp('97'),
    // borderWidth: wp('0.7'),
    // borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius: wp('1'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp('2'), // 1% of the screen's height
    marginHorizontal: wp('6'),
  },

  ReviewchatsimageBackArrowRecentActivity: {
    fontSize: wp('8.5%'),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#C0A7D8',
    fontWeight: '700',
    width: wp('8%'),
    borderRadius: wp('1%'),
    // top: hp('1.3'),
  },
  Reviewchatsrecta: {
   
    textAlignVertical: 'center',
   
  
  },
  ReviewchatsRectatext: {
    fontWeight: '700',
    fontSize: 18,
    // color: '#FFFFFF',
    textAlign: 'center',
    // lineHeight: 28,
    // fontSize: 18,
    color: 'white',
    // lineHeight: 20,
  },
  uppercontmyimg: {
    width: wp('6'),
    height: hp('3.5'),
    resizeMode: 'contain',
  },
  uppercontRBT: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    lineHeight: 24,
  },
  uppertopcontainer: {
    flexDirection: 'row',
  },
  upperinparentcont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
  },
  uppercont3text: {
    fontSize: 20,
    color: 'white',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 30,
    right: 10,
    minWidth: 80,
    zIndex: 999,
  },
  dropdownItem: {
    backgroundColor: '#CBAFF8',
    borderRadius: 5,
    // paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop:4
  },
  dropdownItemText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  editReplyButton:{

color:"white",
backgroundColor:"blue"
  },
  loremtext: {
    color: 'white',
    padding: wp('2'),
  },
  reviewchatslowecontainer: {
    width: '90%',
    paddingVertical: '2%',
    borderWidth: wp('0.5'),
    borderColor: 'rgba(192, 167, 216, 1)',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: wp('1.5'),
    // marginVertical: hp('1'),
  },
  upperbottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  replyText: {
    color: 'white',
    // paddingLeft: wp("2"),
    paddingHorizontal: '5%',
    // bottom: hp("1"),
  },

  SendText: {
    color: 'white',
    // paddingLeft: wp("2"),

    paddingHorizontal: wp('2'),
    // bottom: hp("1"),
  },

  SendChatText: {
    color: 'white',
    // paddingLeft: wp("2"),
    // paddingHorizontal: wp("1"),
    // bottom: hp("1"),
    // height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: wp('12%'),
    // width: '100%',
    padding: '3.8%',
    // paddingHorizontal:'2%',
    borderWidth: 1,
    borderColor: '#CBAFF8',
    backgroundColor: '#CBAFF8',
  },

  heart: {
    marginHorizontal: wp('2'),
  },
  uforium: {
    flexDirection: 'row',
    paddingHorizontal: wp('2'),
  },
  replyinput: {
    height: hp('6%'), // 6% of the screen's height
    width: '85%', // 90% of the screen's width
    borderWidth: 1,
    borderColor: '#CBAFF8',
    backgroundColor: '#CBAFF8',
    // marginBottom: hp('2%'), // 2% of the screen's height
    paddingHorizontal: '2%', // 2% of the screen's width
    borderRadius: wp('12%'), // 12% of the screen's width (to make it round)
    fontFamily: 'Paytone One',
    fontSize: wp('4%'), // 4% of the screen's width
    color: '#fff',
    paddingLeft: '5%', // 5% of the screen's width
  },
  // parenttextsapan:{
  ReviewChatInput: {
    // height: '6%', // 6% of the screen's height
    width: '82%', // 90% of the screen's width
    borderWidth: 1,
    borderColor: '#CBAFF8',
    backgroundColor: '#CBAFF8',
    // bottom: hp('1%'), // 2% of the screen's height
    paddingHorizontal: '2%', // 2% of the screen's width
    marginRight: '3%', // 2% of the screen's width
    borderRadius: wp('12%'), // 12% of the screen's width (to make it round)
    fontFamily: 'Paytone One',
    fontSize: wp('4%'), // 4% of the screen's width
    color: 'white',
    paddingLeft: '5%', // 5% of the screen's width
  },
  // parenttextsapan:{
  ReviewChatInputcontainer: {
    backgroundColor: '#2A0955',
    width: '100%',
    // height:'10%',
    bottom: '0%',
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  span: {
    color: 'white',
  },
  cornerdiv: {
    paddingHorizontal: wp('2'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  T2: {
    marginLeft: wp('2'),
    marginRight: wp('2'),
  },
  readmorebuttonText: {
    color: 'white',
    fontSize: wp('3%'), // 4% of the screen's width
    fontFamily: 'Montserrat',
    textAlign: 'left',
    fontWeight: '700',
    paddingLeft: wp('2'),
    bottom: hp('1'),
    // backgroundColor:"black",
  },
  /////////////////////////////////Dots//////////////////////////////////

  DotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: wp('11'),
    //
  },
  BlocksButton: {
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderRadius: wp('1.5'),
    paddingHorizontal: wp('1'),
    width: wp('42%'),
    paddingVertical: wp('1'),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: wp('3'),
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: wp('0.5'),
  },

  reportstext: {
    color: '#FB0202',
    fontWeight: '700',
    textAlign: 'center',
  },

  blockstext: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },

  //========================================ReviewPlus====================================================//
  boxkie: {
    marginHorizontal: '18%',
    // marginVertical:hp("12"),
    width: '76%', // Adjust width as needed
    height: '35%', // Adjust height as needed
    backgroundColor: 'transparent', // Light gray background
    borderTopWidth: wp('2'),
    borderRightWidth: wp('2'),
    borderColor: '#ccc', // Gray border
    // padding: 10, // Space between content and border
    // margin: 10, // Space around the box
    // shadowColor: '#000', // Shadow color
    // shadowOffset: { width: 0, height: 2 }, // Shadow offset
    // shadowOpacity: 0.1, // Shadow opacity
    // shadowRadius: 5, // Shadow radius
    // elevation: 3, // Android shadow
  },

  boxkies: {
    marginHorizontal: '6%',
    bottom: hp('19'),
    width: '76%', // Adjust width as needed
    height: '36%', // Adjust height as needed
    backgroundColor: 'transparent', // Light gray background
    borderBottomWidth: wp('2'),
    borderLeftWidth: wp('2'),
    // transform: [{rotateY: '180deg'}],
    // transform: [{rotateY: '180deg'}],
    borderColor: '#ccc', // Gray border
    // padding: 10, // Space between content and border
    // margin: 10, // Space around the box
    // shadowColor: '#000', // Shadow color
    // shadowOffset: { width: 0, height: 2 }, // Shadow offset
    // shadowOpacity: 0.1, // Shadow opacity
    // shadowRadius: 5, // Shadow radius
    // elevation: 3, // Android shadow
  },

  inputFind: {
    // height: 100, // Adjust height as needed
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 10,
    textAlign: 'center',
    padding: wp('1'),
    fontSize: 12, // Font size for input text
    color: 'rgba(192, 167, 216, 1)',
    height: hp('9'), // Font color for input text
    width: wp('60'), // Font color for input text
    // backgroundColor: '#f0f0f0', // Background color
    textAlignVertical: 'top', // Aligns text at the top when multiline is true
  },

  // inputFind:{
  //   color:"rgba(192, 167, 216, 1)",
  //   height: hp('5'),
  // },
  Reviewplusparent: {
    width: '100%',
    height: '96.5%',
    backgroundColor:"#2A0955"
  },
  Reviewplusbuttondiv: {
    marginHorizontal: '5%',
  },
  Reviewplusbutton: {
    color: 'white',
    fontSize: 35,
  },
  upperTI: {
    marginHorizontal: '37%',
    width: '100%',
  },
  BigReviewText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  starryimages: {
    flexDirection: 'row',
  },
  RATINGFIVESTAR: {
    width: wp('12'),
    height: hp('12'),
  },
  BorderImage: {
    marginHorizontal: wp('7'),
    marginVertical: wp('10'),
    flexDirection: 'row',
  },
  upperimgborder: {
    left: wp('3'),
    top: hp('3'),
  },
  OppositeBorderImage: {
    marginHorizontal: wp('9'),
    flexDirection: 'row',
    bottom: hp('47'),
  },
  bottomoppositeB: {
    top: hp('20'),
    left: wp('4'),
  },
  imgVectorOppo: {
    width: wp('68'),
  },
  insidediv: {
    // marginHorizontal: wp('1'),
    bottom: hp('60'),
    left: wp('16'),
    // borderWidth: 2,
    // borderColor: 'white',
    width: wp('70'),
    height: hp('23'),
    alignItems: 'center',
  },
  insidedivetext: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  left: {
    bottom: hp('52'),
    left: wp('5'),
  },
  right: {
    left: wp('85'),
    bottom: hp('28.5'),
  },
  samurai: {
    // backgroundColor: 'white'
  },
  udersmallstar: {
    flexDirection: 'row',
    // top: hp('4'),
  },
  Textbelowstars: {
    // top: hp('4'),
    paddingVertical: '2%',
    fontSize: 12,
    color: 'white',
  },
  loveconti: {
    top: hp('5'),
  },
  liketext: {
    // top: hp('5'),
    fontSize: 12,
    color: 'white',
  },
  submi: {
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: 2,
    width: wp('30'),
    borderRadius: wp('1.5'),
    // bottom: hp('14'),
    left: wp('60'),
    bottom: hp('42'),
  },
  submiText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  containerBelowImage: {
    // marginTop:hp("35"),
    backgroundColor: '#2A0955',
  },
  BartopImage: {
    height: wp('80'),
    width: wp('100'),
    // top: wp('9'),
    // resizeMode: 'contain',
  },

  Barboxmaincont: {
    flexDirection: 'row',
    width: '100%',
    height: hp('17'),
    // justifyContent: 'center',
  },

  Barboxmaincontainers: {
    flex: 1,
    flexDirection:"row"
  },

  Barboxcont: {
    marginHorizontal: '3%',
    marginVertical:10,
    //  backgroundColor:"black",
    width: '22%',
  },

  dollarcontainer: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
},
iconContainers: {
 height: hp('4'),
 backgroundColor:"grey",
 width: '0.8%',
},


  Barstarcont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  Barstar: {
    width: wp('2.5'),
    height: hp('1.5'),
  },

  Barboxtext: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },

  Barboximg: {
    marginHorizontal: wp('3'),
    borderRadius: wp('13'),
    marginVertical: hp('0.5'),
    width: wp('15'),
    height: wp('15'),
  },
  reviewpluscontainer: {
    //  marginHorizontal:wp('12'),
    //  marginBottom:hp('1'),
  },

  barpagetextstylecontainer: {
    marginHorizontal: '1.5%',
    //  marginTop:hp('0.1'),
    width: '61.8%',
  },
  barpagefirsttext: {
    flexWrap: 'wrap',
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    width:"90%"
  },
  barpagesecondtext: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
  Barclocktext: {
    marginHorizontal: wp('2'),
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },

  barclockimgcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:"center",
    marginHorizontal: '4%',
    marginVertical: '4%',
    // marginTop:hp('0.5'),
    width: '100%',
  },

  barlocationimgcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems:"center",
    // marginHorizontal:wp('2'),
    width: '50%',
    // height: wp('15'),
  },

  plusbuttonActivity: {
    // left: 90,
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    paddingVertical: wp('1'),
    // top: wp('8'),
  },

  reviewcrec: {
    borderWidth: wp('0.6'),
    borderRadius: wp('2'),
    // width: wp('32'),
    // height: hp('5'),
    textAlignVertical: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '3%',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderColor:"transparent"
  },


  customerreview: {
    // marginLeft: wp('60'),
    marginTop: wp('-18'),
    paddin: wp('25'),
    width: wp('35'),
    height: wp('35'),
    backgroundColor: '#2B0F5A',
    borderWidth: wp('0.6'),
    borderBottomColor: '#C0A7D8',
    borderRightColor: '#C0A7D8',
    // borderRadius: wp('1.5'),
  },

  customerreviewcont: {
    //  display:"flex",
    flexDirection: 'row',
    justifyContent: 'center',
  },

  barpagecustomerreviewtext: {
    paddingTop: hp('0.5'),
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '700',
  },

  starbar: {
    paddingHorizontal: wp('1.6'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A47ABF',
    height: hp('2.4'),
    width: wp('30'),
    borderRadius: wp('50'),
    marginHorizontal: wp('1.8'),
    marginVertical: hp('0.5'),
  },

  ratingbar: {
    backgroundColor: 'white',
    height: hp('1.2'),
    width: wp('18'),
    borderRadius: wp('50'),
    marginHorizontal: wp('1.2'),
    marginVertical: hp('0.3'),
  },

  goldenratingbar1: {
    backgroundColor: '#FFCA40',
    height: hp('1.2'),
    width: wp('12'),
    borderRadius: wp('50'),
  },
  goldenratingbar2: {
    backgroundColor: '#FFCA40',
    height: hp('1.2'),
    width: wp('10'),
    borderRadius: wp('50'),
  },
  goldenratingbar3: {
    backgroundColor: '#FFCA40',
    height: hp('1.2'),
    width: wp('8'),
    borderRadius: wp('50'),
  },
  goldenratingbar4: {
    backgroundColor: '#FFCA40',
    height: hp('1.2'),
    width: wp('6'),
    borderRadius: wp('50'),
  },
  goldenratingbar5: {
    backgroundColor: '#FFCA40',
    height: hp('1.2'),
    width: wp('4'),
    borderRadius: wp('50'),
  },

  ratingbarcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp('1'),
    top: hp('1'),
  },

  ratingbartext: {
    color: 'white',
    fontSize: 9,
    fontWeight: '400',
  },
});

export default styles;
