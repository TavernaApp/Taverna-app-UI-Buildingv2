import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeIcon from '../assets/bottom-navigation-icons/01.png';
import MapIcon from "../assets/bottom-navigation-icons/02.png";
import PlusIcon from "../assets/bottom-navigation-icons/plus.png";
import ShoutsIcon from "../assets/bottom-navigation-icons/shouts-icon.png";
import ProfileIcon from "../assets/bottom-navigation-icons/05.png";
import HomeScreen from '../Screens/HomeScreen';
import MapScreen from '../Screens/MapScreen';
import PlusScreen from '../Screens/PlusScreen';
import ShoutsScreen from '../Screens/SearchScreenBottomBar';
import ProfileScreen from '../Screens/FriendDetailsScreen';
import CustomTabIcon from './CustomTabIcon';
import MyMapScreen from '../Screens/MyMapScreen';
import MyFriendsScreen from '../Screens/MyFriends';
import PopularScreen from '../Screens/PopularScreen';
import AllScreen from '../Screens/AllScreen';
import SearchScreen from '../Screens/SearchScreen';
import RecentActivity from '../Screens/RecentActivityScreen';
import FromFriends from '../Screens/FromFriendsScreen';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../css/styles';
import SearchIcon from "../assets/bottom-navigation-icons/04.png"
import FriendDetailsScreen from '../Screens/FriendDetailsScreen';
import Timeline from '../Screens/TimeLineScreen';
import SavedScreen from '../Screens/SavedScreen';
import CrawlsScreen from '../Screens/CrawlsScreen';

import MyProfileScreen from '../Screens/MyProfileScreen';
import SettingScreen from '../Screens/SettingScreen';
import FollowScreen from '../Screens/FollowScreen';
import FollowingScreen from '../Screens/FollowingScreen';
import CreatCrawlsScreen from '../Screens/CreatCrawlsScreen';
import AddCrawlScreen from '../Screens/AddCrawlScreen';
import CrawlDetailsScreen from '../Screens/CrawlDetailsScreen';
import PlusReview from '../Screens/PlusReview';
import Reviewchats from '../Screens/Reviewchats';
import BlockedListScreen from '../Screens/BlockedListScreen';
import BarDetailScreen from '../Screens/BarDetailScreen';
import ImageModal from '../Screens/ImageModal';
import FriendFollowScreen from '../Screens/FriendFollowScreen';
import FriendFollowingScreen from '../Screens/FriendFollowingScreen';
import SearchScreenBottomBar from '../Screens/SearchScreenBottomBar';
// import UserDetailsScreen from '../Screens/UserDetailsScreen';
import SavedBarDetailScreen from '../Screens/SavedBarDetailScreen';
import HomeBarDetailScreen from '../Screens/HomeBarDetailScreen';
import SearchFriendDetailsScreen from '../Screens/SearchFriendDetailsScreen';
import MapBarDetailScreen from '../Screens/MapBarDetailScreen';
import HomeReviewchats from '../Screens/HomeReviewchats';
import SavedReviewchats from '../Screens/SavedReviewchats';
// import OTPScreen from '../Screens/OTPScreen';
import MySaved from '../Screens/MySaved';
import MyTimeLineScreen from '../Screens/MyTimeLineScreen';
import MyCrawlsScreen from '../Screens/MyCrawlsScreen';
import BarIdEntryScreen from '../Screens/BarIdEntryScreen';
import SearchBarDetailScreen from '../Screens/SearchBarDetailScreen';
import PlusBarDetailScreen from '../Screens/PlusBarDetailScreen';
import CrawlBarDetailScreen from '../Screens/CrawlBarDetailScreen';
import CrawlDetailBarDetailScreen from '../Screens/CrawlDetailBarDetailScreen';
import MyProfileBarDetailScreen from '../Screens/MyProfileBarDetailScreen';
import SearchReviewchats from '../Screens/SearchReviewchats';
import PlusReviewchats from '../Screens/PlusReviewchats';
import MapReviewchats from '../Screens/MapReviewchats';
import MyProfileReviewchats from '../Screens/MyProfileReviewchats';
import CrawlReviewchats from '../Screens/CrawlReviewchats';
import CrawlDetailReviewchats from '../Screens/CrawlDetailReviewchats';
import UserIdEntryScreen from '../Screens/UserIdEntryScreen';
const Tab = createBottomTabNavigator();
// Create a custom header component
const TopBar = () => {
  const navigation = useNavigation(); 

  const handleTabPress = (screenName) => {
    navigation.navigate(screenName);
  };
  
  return (
    <View style={styles.topBarContainer}>

      <View style={styles.tabsContainer}>
  
        <TouchableOpacity onPress={() => handleTabPress('My Map')}>
          <Text style={styles.tab}>My Map</Text>
        </TouchableOpacity>
        
      
        <TouchableOpacity onPress={() => handleTabPress('My Friends')}>
          <Text style={styles.tab}>My Friends</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => handleTabPress('My Popular')}>
          <Text style={styles.tab}>Popular</Text>
        </TouchableOpacity>
        
      
        <TouchableOpacity  onPress={() => handleTabPress('All Screen')}>
          <Text style={styles.tab}>All</Text>
        </TouchableOpacity>
       
      </View>
   
      <View style={styles.searchBarContainer}>
        
        <TouchableOpacity  onPress={() => handleTabPress('Search')}>
         
          <CustomTabIcon source={SearchIcon} />
        </TouchableOpacity>
      </View>
    </View>
    
 
  );
};
const HomeTabs = () => {


    return (
      
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8e8e93',
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: '#9F69D8' },
        }}>
        {/* Each tab screen */}
        <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{ 
      // headerShown: false, // Hide the header
      // tabBarLabel: '', // Hide tab label
      headerStyle: {
        backgroundColor: 'black', 
        height: 34, 
      },
      headerTitleStyle: {
        color: 'white', 
         textAlign: 'center', 
         fontFamily:"Jomhuria",
         fontSize:18,
         fontWeight:"bold",
  
        },
        headerTitleAlign: 'center',
 
      tabBarIcon: ({ color, size }) => (
        <CustomTabIcon source={HomeIcon} />
      ),
       }}
  />
        <Tab.Screen
          name="Map"
          // component={MapScreen}
          component={MyMapScreen}
          options={{
            // headerShown: false, // Hide the header
            // tabBarLabel: '', // Hide tab label
              // headerStyle: { backgroundColor: '#7A4BAB' }, 
              //   tabBarStyle: { backgroundColor: '#9F69D8' },
            // headerTitle: () => <TopBar/>,
            headerStyle: {
              backgroundColor: 'black', 
              height: 34, 
            },
            headerTitleStyle: {
              color: 'white', 
               textAlign: 'center', 
               fontFamily:"Jomhuria",
               fontSize:18,
               fontWeight:"bold",
        
              },
              headerTitleAlign: 'center',
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon source={MapIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="Plus"
          component={PlusScreen}
          options={{
            // headerShown: false, // Hide the header
            // tabBarLabel: '', // Hide tab label
            headerStyle: {
              backgroundColor: 'black', 
              height: 34, 
            },
            headerTitleStyle: {
              color: 'white', 
               textAlign: 'center', 
               fontFamily:"Jomhuria",
               fontSize:18,
               fontWeight:"bold",
        
              },
              headerTitleAlign: 'center',
       
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon source={PlusIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="SearchScreenBottomBar"
          component={SearchScreenBottomBar}
          options={{
            // headerShown: false, // Hide the header
            // tabBarLabel: '', // Hide tab label
            headerStyle: {
              backgroundColor: 'black', 
              height: 34, 
            },
            headerTitleStyle: {
              color: 'white', 
               textAlign: 'center', 
               fontFamily:"Jomhuria",
               fontSize:18,
               fontWeight:"bold",
        
              },
              headerTitleAlign: 'center',
       
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon source={SearchIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="My Profile"
          component={MyProfileScreen}
          options={{
            // headerShown: false, // Hide the header
            // tabBarLabel: '', // Hide tab label
            headerStyle: {
              backgroundColor: 'black', 
              height: 34, 
            },
            headerTitleStyle: {
              color: 'white', 
               textAlign: 'center', 
               fontFamily:"Jomhuria",
               fontSize:18,
               fontWeight:"bold",
        
              },
              headerTitleAlign: 'center',
       
            tabBarIcon: ({ color, size }) => (
              <CustomTabIcon source={ProfileIcon} />
            ),
          }}
        />
      
          <Tab.Screen
        name="My Map"
        
        component={MyMapScreen}
        options={{ tabBarButton: () => null ,
          // headerShown: false, // Hide the header
          // tabBarLabel: '', // Hide tab label
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
     
        }} // Hide the tab
      />
            <Tab.Screen
        name="My Friends"
        component={MyFriendsScreen}
        options={{ tabBarButton: () => null,   
        //   headerShown: false, 
        // tabBarLabel: '', 
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
    
          },
          headerTitleAlign: 'center',
   
       }} 
      />
            {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarButton: () => null,   
        //   headerShown: false, 
        // tabBarLabel: '', 
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
    
          },
          headerTitleAlign: 'center',
   
       }} 
      /> */}
           <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ tabBarButton: () => null,   
        //   headerShown: false, 
        // tabBarLabel: '', 
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
    
          },
          headerTitleAlign: 'center',
   
       }} 
      />
           <Tab.Screen
        name="My Popular"
        component={PopularScreen}
        options={{ tabBarButton: () => null,   
        // headerShown: false, 
        // tabBarLabel: '', 
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
    
          },
          headerTitleAlign: 'center',
             
         }}
      
      />
      <Tab.Screen
        name="All"
        component={AllScreen}
        options={{ tabBarButton: () => null,
          // headerShown: false, // Hide the header
          // tabBarLabel: '', // Hide tab label
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="SearchReviewchats"
        component={SearchReviewchats}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="PlusReviewchats"
        component={PlusReviewchats}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="MapReviewchats"
        component={MapReviewchats}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="MyProfileReviewchats"
        component={MyProfileReviewchats}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="CrawlReviewchats"
        component={CrawlReviewchats}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="CrawlDetailReviewchats"
        component={CrawlDetailReviewchats}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
      <Tab.Screen
        name="Recent Activity"
        component={RecentActivity}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
        }} 
      />
         <Tab.Screen
        name="From Friends"
        component={FromFriends}
        options={{ tabBarButton: () => null,
          // headerShown: false, 
          // tabBarLabel: '', 
          headerStyle: {
            backgroundColor: 'black', 
            height: 34, 
          },
          headerTitleStyle: {
            color: 'white', 
             textAlign: 'center', 
             fontFamily:"Jomhuria",
             fontSize:18,
             fontWeight:"bold",
      
            },
            headerTitleAlign: 'center',
     
        }} 
      />

      {/* <Tab.Screen
      name="UserDetailsScreen"
      component={UserDetailsScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      /> */}


      <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />

      <Tab.Screen
      name="SearchFriendDetailsScreen"
      component={SearchFriendDetailsScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="Time Line"
      component={Timeline}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
           <Tab.Screen
      name="Follow"
      component={FollowScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
                 <Tab.Screen
      name="Following"
      component={FollowingScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
           <Tab.Screen
      name="FriendFollow"
      component={FriendFollowScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
                 <Tab.Screen
      name="FriendFollowing"
      component={FriendFollowingScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />

                 <Tab.Screen
      name="New Crawls"
      component={CreatCrawlsScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
                       <Tab.Screen
      name="Add To Crawl"
      component={AddCrawlScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
                           <Tab.Screen
      name="Crawl Details"
      component={CrawlDetailsScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
                           <Tab.Screen
      name="BarIdEntry"
      component={BarIdEntryScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       <Tab.Screen
      name="UserIdEntry"
      component={UserIdEntryScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
            <Tab.Screen
      name="Crawls"
      component={CrawlsScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
            <Tab.Screen
      name="Saved"
      component={SavedScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />      
      <Tab.Screen
      name="PlusReview"
      component={PlusReview}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="Reviewchats"
      component={Reviewchats}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="SavedReviewchats"
      component={SavedReviewchats}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="HomeReviewchats"
      component={HomeReviewchats}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="BlockedList"
      component={BlockedListScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       
        <Tab.Screen
      name="BarDetails"
      component={BarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       
       
        <Tab.Screen
      name="MyProfileBarDetails"
      component={MyProfileBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       
        <Tab.Screen
      name="CrawlDetailBarDetails"
      component={CrawlDetailBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       
        <Tab.Screen
      name="CrawlBarDetails"
      component={CrawlBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       
        <Tab.Screen
      name="PlusBarDetails"
      component={PlusBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       
        <Tab.Screen
      name="SearchBarDetails"
      component={SearchBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="SavedBarDetails"
      component={SavedBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
        <Tab.Screen
      name="HomeBarDetails"
      component={HomeBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       <Tab.Screen
      name="Imagemodal"
      component={ImageModal}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       <Tab.Screen
      name="MapBarDetailScreen"
      component={MapBarDetailScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       {/* <Tab.Screen
      name="OTPScreen"
      component={OTPScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      /> */}
       <Tab.Screen
      name="My Saved"
      component={MySaved}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       <Tab.Screen
      name="My TimeLine"
      component={MyTimeLineScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
       <Tab.Screen
      name="My Crawls"
      component={MyCrawlsScreen}
      options={{tabBarButton:()=>null,
        headerStyle: {
          backgroundColor: 'black', 
          height: 34, 
        },
        headerTitleStyle: {
          color: 'white', 
           textAlign: 'center', 
           fontFamily:"Jomhuria",
           fontSize:18,
           fontWeight:"bold",
          },
          headerTitleAlign: 'center',
      
      }}
      
      />
      </Tab.Navigator>
    );
  };
  export default HomeTabs;