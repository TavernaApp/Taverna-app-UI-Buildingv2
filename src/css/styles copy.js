
import { StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily:"Paytone One",
        fontWeight: '900',
      color:"#E1C8FB",

      },
      input: {
        height: 53,
        width: '90%',
        borderWidth: 1,
        borderColor: '#CBAFF8',
        backgroundColor:'#CBAFF8',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 25,
       fontFamily: 'Paytone One',
      fontSize:22,
      color:"#fff",
      paddingLeft: 25, // Add paddingLeft to move text 10px from the left edge


      },
        // Add a new style for when input is focused
  inputFocused: {
    backgroundColor: '#fff', // Background color when focused
    color: "#000", // Text color when focused
  },

      text: {
        color:"white",
        marginBottom:0,
    fontFamily: 'Paytone One',
      },
     
  heading: {
    fontFamily: 'Paytone One',
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 45,
    letterSpacing: 0.02,
    textAlign: 'center',
    marginBottom: 20,
    color:'#CBAFF8'
  },
  LoginBtn:{
  backgroundColor: "#7000BEC",
  fontSize: 40,
  width: 300, // Increase width here
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  height: 53,
  marginBottom: 28,
  borderWidth: 2,
  borderColor: '#896BA8', // Add border color if needed
    },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    width: 300,
    height: 53,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#7000BECC', // Add border color if needed
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: "Montserrat",
    textAlign: "center"
  },
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"100%",
  },
  /////     TopBar NavBar css         /////
  tabsContainer: {
    flexDirection: 'row',
    justifyContent:"center",
    backgroundColor: '#7000BE',
    borderRadius: 30,
    paddingHorizontal: 0,
    paddingVertical:0,
  },
  tab: {
    color: '#fff',
    margin:6,
    fontSize: 14,
    fontFamily:"Montserrat",
    fontWeight:"bold",

  },
  searchBarContainer: {
    paddingHorizontal: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  width: Dimensions.get('window').width / 4, // Adjust width to display 4 items at a time
  paddingHorizontal: 5,
  paddingVertical: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop:30
},
imageCarouselSlider: {
  // width: '100%',
  // height: 124,
  borderRadius: 8,
},
textContainerCarouselSlider: {
  marginTop: 5,
  alignItems: 'center',
},
movieNameCarouselSlider: {
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
arrowButtonCarouselSlider: {
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
prevButtonCarouselSlider: {
  left: 5,
textAlign:"center",
justifyContent:"center"
},
nextButtonCarouselSlider: {
  right: 5,
  textAlign:"center",
  justifyContent:"center"
},

buttonTextArowCarouselSlider: {
  fontSize: 24,
  fontFamily:"Roboto",
  fontWeight:"bold",
  color: '#C0A7D8',
 textAlign:"center",
 justifyContent:"center",
 marginBottom:3
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
  paddingHorizontal: 30,
  paddingVertical:4,
  backgroundColor:"#7000BE",
  justifyContent:"center",
  borderRadius:6,
  borderColor: '#C0A7D8',
  borderWidth: 3,
},
buttonTextCarouselSlider: {
  fontSize: 22,
  fontFamily:"Roboto",
  fontWeight:"700",
  color: '#fff',
},
// ==============================================END Carousel Slider==================================================

});

export default styles;
