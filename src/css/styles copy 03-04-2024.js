
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width,height  } = Dimensions.get('window');
const screenWidth = width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp('5%'), // 5% of the screen's width
    marginBottom: hp('2%'), // 2% of the screen's height
    fontFamily: "Paytone One",
    fontWeight: '900',
    color: "#E1C8FB",

  },
  input: {
    height: hp('6%'), // 6% of the screen's height
    width: wp('90%'), // 90% of the screen's width
    borderWidth: 1,
    borderColor: '#CBAFF8',
    backgroundColor: '#CBAFF8',
    marginBottom: hp('2%'), // 2% of the screen's height
    paddingHorizontal: wp('2%'), // 2% of the screen's width
    borderRadius: wp('12%'), // 12% of the screen's width (to make it round)
    fontFamily: 'Paytone One',
    fontSize: wp('4%'), // 4% of the screen's width
    color: "#fff",
    paddingLeft: wp('5%'), // 5% of the screen's width

  },
  // Add a new style for when input is focused
  inputFocused: {
    backgroundColor: '#fff', // Background color when focused
    color: "#000", // Text color when focused
  },

  text: {
    color: "white",
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
    color: '#CBAFF8'
  },
  LoginBtn: {
    backgroundColor: "#7000BEC",
    fontSize: wp('6%'), // 6% of the screen's width
    width: wp('50%'), // 50% of the screen's width
    borderRadius: wp('12%'), // 12% of the screen's width (to make it round)
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('6%'), // 6% of the screen's height
    marginBottom: hp('3%'), // 3% of the screen's height
    borderWidth: 2,
    borderColor: '#896BA8', // Add border color if needed

  },
  image: {
    width: wp('100%'), // 100% of the screen's width
    height: hp('50%'), // 50% of the screen's height
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: hp('2%'), // 2% of the screen's height

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
    fontFamily: "Montserrat",
    textAlign: "center",
    fontWeight: "bold"

  },
  /////     TopBar NavBar css         /////
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:"yellow",
    paddingHorizontal: wp('10%'), // 5% of the screen's width
    paddingVertical: hp('1%'), // 1% of the screen's height
    // backgroundColor: 'black', // Set the background color to black
  
  },

  tabsContainer: {
    display:"flex",
    flexDirection: 'row',
    justifyContent: "center",
    
    backgroundColor: '#7000BE',
    // backgroundColor: "#000",
    // backgroundColor:"yellow",

    borderRadius: wp('3%'),
    paddingHorizontal: wp('20%'), // 2% of the screen's width
    paddingVertical: hp('0'), // 1% of the screen's height
    // width: wp('67%'), // 90% of the screen's width
    width:wp("70%"),
    //  marginLeft:"-5%",/
    // marginLeft: wp('-3%'),
  },
  tab: {
    color: '#fff',
    margin: wp('2%'), // 1% of the screen's width
    fontSize: wp('4%'), // 3% of the screen's width
    fontFamily: "Montserrat",
    fontWeight: "bold",

  },
  searchBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('1%'),
    marginLeft: hp('2%'),

  },
  searchBar: {
    color: '#fff',
  },
  // ---------------------------------------------End------------------------------------------------------------
  // ==============================================Carousel Slider==================================================

  containerCarouselSlider: {
    flex: 1,
    position: 'relative',
  },
  itemContainerCarouselSlider: {
    width: wp('33.5%'), // 25% of the screen width
    height:wp('100%'),
    // width: wp('25%'), // 25% of the screen width
    paddingHorizontal: wp('1%'),
    // paddingVertical: hp('1%'), // 1% of the screen height
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: hp('3%'), // 3% of the screen height
  },
  imageCarouselSlider: {
    width: '100%',
    // height: 130,
    height:wp('45%'),
    borderRadius: 8,
  },
  textContainerCarouselSlider: {
    // marginTop: 5,
    marginTop:hp("1%")
    // alignItems: 'left',
  },
  movieNameCarouselSlider: {
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'left',
    color: "#FFFFFF"
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
    position: "absolute",
    zIndex: 1,
    // backgroundColor: '#7000BE',
    justifyContent: "center",
    color: "#C0A7D8",
    // borderColor: '#C0A7D8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 0,
    // borderWidth: 3,
    margin: 10,
  },
  prevButtonCarouselSlider: {
    left: 5,
    textAlign: "center",
    justifyContent: "center"
  },
  nextButtonCarouselSlider: {
    right: 5,
    textAlign: "center",
    justifyContent: "center"
  },

  buttonTextArowCarouselSlider: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: '#C0A7D8',
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 3
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
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 6,
    borderColor: '#C0A7D8',
    // borderWidth: 3
    width: "60%"
  },
  buttonTextCarouselSlider: {
    fontSize: 22,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: '#fff',
    textAlign: "center"
  },
  // ==============================================END Carousel Slider==================================================
  // ================================================ RecentActivityScreen =============================================
  topBarButtonRecentActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
    // backgroundColor:"yellow",
    // paddingHorizontal: wp('1%'), // 5% of the screen's width
    paddingVertical: hp('1%'), // 1% of the screen's height
    marginTop: hp('2%'),
  },
  topBarButtonAlignmentRecentActivity: {
    flex: 1,
  },
  imageBackArrowRecentActivity: {
    fontSize: wp('5%'),
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: '#C0A7D8',
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#C0A7D8",
    fontWeight: "700",
    width: wp('8%'),
    borderRadius: wp('1%'),
    // backgroundColor: "#7000BE",
    // paddingHorizontal: wp('3%'),
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
    // backgroundColor: "#7000BE",
    display: "flex",
    justifyContent: "center",
    // textAlign: "center",
    textAlign:"center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    paddingVertical: hp('0.7%'),
    fontSize: wp('6%'),
    borderRadius: wp('2%'),
    width: wp('85%'),
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
    backgroundColor: "#7A4BAB",
    // paddingBottom: hp('2%'),



  },
  contentContainerStyleRecentActivity: {
    // paddingHorizontal: wp('1%'),
    // paddingTop: hp('3%'),
    paddingBottom: hp('10%'),
   
   
  
  },

  imageRecentActivity: {
    borderColor: "#A178BC",
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
    fontWeight: "500",
    marginHorizontal: wp('1%')
  },
  priceRecentActivity: {
    fontSize: wp('2.5%'),
    color: 'white',
    fontFamily: "Roboto Flex",
    fontWeight: "700",
    marginTop: hp('0.3%'),
    marginHorizontal: wp('1%')


  },

  // ================================================ END RecentActivityScreen =============================================
  // ======================================StarRating=======================================================================
  imageStarRating: {

    width: hp('1.0%'),
    height: hp('1.3%'),
    // marginTop: hp('0.3'),
    marginHorizontal: wp('1%'),

  },
  // ======================================END StarRating=======================================================================
  // =========================================Start DetailScreen ===============================================================
  containerDetailScreen: {
    flex: 1,
    position: 'relative', // Ensure proper positioning of children
  },
  imageContainer: {
    flex: 1,

  },
  buttonContainerDetailScreen: {
    position: 'absolute',
    top: 20,
    left: 5,
    zIndex: 2, // Ensure it's on top of the image

  },
  imageDetailScreen: {
    resizeMode: "stretch", // Make sure the image covers the container
  width:"100%"
  },
  imageBackArrowDetailScreen: {
    fontSize: wp('5%'),
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: '#C0A7D8',
    textAlign: "center",
    justifyContent: "center",
    // borderColor: "#C0A7D8",
    fontWeight: "700",
    width: wp('8%'),
    borderRadius: wp('1%'),
    // backgroundColor: "#7000BE",
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1'),
    marginHorizontal: wp('2'),


  },
  // =========================================END DetailScreen ===============================================================

// ============================================== My Friends Section ============================================================
containerMyFriends: {
  // flex: 1,
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
  fontFamily:"Roboto",
  fontWeight:"700",
  textAlign: 'left',
  marginLeft:10
},
seeMoreContainerMyFreinds: {
  flexDirection: 'row',
  alignItems: 'center',
},
seeMoreText: {
  color: 'white',
  fontSize: 16,
  fontFamily:"Roboto",
  fontWeight:"700",
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

imageFriendScreen: {
  width: wp('27%'), // 100% of the screen's width
  height: hp('15%'), // 50% of the screen's height
 borderRadius:(15)
  // resizeMode: 'contain',
},
// ===================== Freind End Detail Screen========================
// =====================umer code =========================================
// =======================================timelinecomponent==================================================
upperText: {
  fontFamily: "Roboto Flex",
  fontSize: 25,
  Top: 10, 
  color: 'white', 
},
circleimage:{
  top: 40,
  width: 100, 
  resizeMode: 'contain'
},
profoimage: {
  justifyContent: 'center',
  alignItems: 'center',
},
outbox:{
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
  textInput2: { 
    position: 'absolute',
    height: 49,
    width: 331.21,
    backgroundColor: 'rgba(203, 175, 248, 1)',
    borderRadius: 25,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    right: 145,
    shadowColor: 'white', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 10, 
    shadowRadius: 4, 
    elevation: 5,
  },
  textInputContainer:{
    position: 'relative',
    width: '80%',
    marginBottom: 20,
  },
  lusButt2:{
    borderColor: 'rgba(112, 0, 190, 1)',
    paddingHorizontal: 4,
    width: 37,
    borderWidth: 3,
    borderRadius: 50,
    zIndex: 1,
    position: 'relative',
    marginTop: 17,
    left: 140,
  },
  textInputmid:{
    height: 58,
    width: 331.21,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    right: 145,
    shadowColor: 'white', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 10, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  textIC:{
    marginTop: 140,
  },
  textInput: { 
    height: 49,
    width: 331.21,
    backgroundColor: 'rgba(203, 175, 248, 1)',
    borderRadius: 25,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    right: 145,
    shadowColor: 'white', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 10, 
    shadowRadius: 4, 
    elevation: 5,
  },
  plus1Button:{
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 2,
    borderColor: 'rgba(203, 175, 248, 1)',
    left: 180,
    marginTop: 30,
    height: 33,
    width: 33,
    borderRadius: 50,
  },
  CancelBT:{
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 1)',
  },
  cancelbuttonActivity:{
    left: 90,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2, 
    marginTop: 30,
  },
  crec:{
    borderWidth: 2,
    borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius: 5,
    width: 118,
    height: 30,
    backgroundColor: 'rgba(112, 0, 190, 1)',
    left: 120,
    marginTop: 30,
  },
  cCrecText:{
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 25,
  },
  /////////////////////////////////////settingComponent/////////////////////////////////////////////////////
  RBTD:{
    lineHeight: 20,
    fontSize: 18,
    color: 'red',
  },
  RBT:{
    fontSize: 18,
    color: 'white',
    lineHeight: 20,
  },
  RB: {
    width: 308,
    height: 30,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(192, 167, 216, 1)',
    backgroundColor: 'rgba(112, 0, 190, 1)',
    padding: 3,
    margin: 5,
    marginHorizontal: "8%",
  },
  recta: {
    borderWidth: 2,
    borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius: 5,
    width: 118,
    height: 30,
    backgroundColor: 'rgba(112, 0, 190, 1)',
    right: 20,
    marginTop: 30,
  },
  Rectatext:{
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 25,
  },
  conti: {
    flexDirection: 'row',
    right: 85,
    paddingVertical: 3,
  },
  MytopBarButtonRecentActivity: {
    alignItems: 'center',
    paddingHorizontal: wp('25%'), // 5% of the screen's width
    paddingVertical: hp('1%'), // 1% of the screen's height
    marginTop: 10,
  },
  MyimageBackArrowRecentActivity:{
    // marginLeft:10,
      fontSize: 24,
      fontWeight:"bold",
      fontFamily:"Roboto",
      color: '#C0A7D8',
     textAlign:"center",
     justifyContent:"center",
      borderColor:"#C0A7D8",
      fontWeight:"700",
     width:33,
     height: 35,
     borderRadius:6,
     paddingHorizontal: 10,
     borderWidth: 3,
     margin:10,
  },
  Incontainer:{
    right: 3,
    width: 365,
    height: 550,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 200,
    marginHorizontal: 'auto',
    elevation: 5,
  },
  /////////////////////////////////////////ProfileScreenScreen///////////////////////////////////////////
  rectangleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: wp('2'),
    marginVertical: wp(8.5),
  },
  rectangle: {
  
    borderWidth:wp('0.6'),
    borderColor: 'rgba(192, 167, 216, 1)',
    borderRadius:wp('1.5'),
    width:wp("38"),
    height: wp('9.7'),
    backgroundColor: 'rgba(112, 0, 190, 1)',
    marginBottom: wp('4.9'),

    
  },
  rectangleText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
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
    height: 130,
    borderRadius: 8,
  },
  textContainerMyCarouselSlider: {
    marginTop: 5,
    alignItems: 'center',
  },
  movieNameMyCarouselSlider: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FFFFFF"
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
  arrowButtonMyCarouselSlider: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: '#7000BE',
    justifyContent:"center",
    color:"#C0A7D8",
    borderColor: '#C0A7D8',
    borderRadius:6,
    paddingHorizontal: 10,
    paddingVertical:0,
    borderWidth: 3,
    margin:10,
  },
  prevButtonMyCarouselSlider: {
    left: 5,
  textAlign:"center",
  justifyContent:"center"
  },
  // nextButtonMyCarouselSlider: {
  //   right: 5,
  //   textAlign:"center",
  //   justifyContent:"center"
  // },
  
  buttonTextArowMyCarouselSlider: {
    fontSize: 24,
    fontFamily:"Roboto",
    fontWeight:"bold",
    color: '#C0A7D8',
   textAlign:"center",
   justifyContent:"center",
   marginBottom:3
  },
  MycarouselContentContainer: {
    paddingLeft: 0,
  },
  MytopContainerCarouselSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonMyCarouselSlider: {
    paddingHorizontal: 30,
    paddingVertical:4,
    backgroundColor:"#7000BE",
    justifyContent:"center",
    borderRadius:6,
    borderColor: '#C0A7D8',
    borderWidth: 3,
  },
  buttonTextArowMyCarouselSlider: {
    fontSize: 22,
    fontFamily:"Roboto",
    fontWeight:"700",
    color: '#fff',
  },
  FlatListRecentActivity1:{ 
    margin: 0, 
    // backgroundColor: "#7A4BAB",
    },
  imageContainer: {
    bottom: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage:{  
    top: 37,
    resizeMode: 'contain'

  },
  imageText: {
    fontFamily: "Roboto Flex",
    fontSize: 27, 
    textAlign: 'center',
    color: 'white', 
    top: 33,
  },
  subtext: {
    fontFamily:"Roboto Flex",
    fontSize: 13,
    color: 'white',
    textAlign: "center",
    top: 27,
  },
  // gradientEffect: {
  //   backgroundColor: 'rgba(49, 37, 55, 0.8)',
  // },
  containerBelowText:{
    bottom: 47,
    // width: wp('100%'),
    width:"auto",
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: 'auto',
    elevation: 5,
    backgroundColor:"#7A4BAB"
},
  followButton: {
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '30%',
    paddingVertical: 5,
    marginLeft: '35%',
    marginTop: 40,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 115,
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: 2,
  },
  followButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageWrapper: {
    padding: 20,
    alignItems: 'center',
  },
  bottomImage: {
    width: 150, 
    height: 150, 
    resizeMode: 'contain',
  },
  inImage:{
    marginBottom: 0,
    padding: 0,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: "7%",
    marginHorizontal: '27%',
    marginBottom: "9%",
  },
  circle: {
    borderWidth: 2,
    width: 'auto',
    height: 'auto',
    borderRadius: 27, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderColor: 'rgba(192, 167, 216, 1)',
  },
  circleText:{
    fontSize: 13,
    color: 'white',
    top: 55,
    right: 132,
  },
  circleText1:{
    fontSize: 13,
    color: 'white',
    top: 55,
    right: 65,
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderColor: 'rgba(192, 167, 216, 1)'
  },
  profileIcon:{
    width: '100%',
    height: '100%',
    transform: [{ rotateY: '180deg' }],
    right: 3,
  },
  profileIcon1:{
    width: '90%',
    height: '85%',
    left: 2,
  },
  reviewButton: {
    backgroundColor: 'rgba(112, 0, 190, 1)',
    borderRadius: 5,
    paddingHorizontal: 7,
    width: '40%',
    paddingVertical: 10,
    marginHorizontal: "30%",
    borderColor: 'rgba(192, 167, 216, 1)',
    borderWidth: 2,
  },
  reviewButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'center', // Align items horizontally
    alignItems: 'center',
  },
  ///////////////////////////////////profilescreenend/////////////////////////////////////////////////////

});

export default styles;
