import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import SignupScreen from './src/Screens/SignupScreen';
import SplashScreen from './src/Screens/SplashScreen';
import MainScreen from './src/Screens/MainScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './src/css/styles';
import SearchIcon from "./src/assets/bottom-navigation-icons/search-icon.png"
import HomeTabs from './src/components/HomeTabs';
import CustomTabIcon from './src/components/CustomTabIcon';
import DetailScreen from './src/Screens/DetailScreen';
import { Provider } from 'react-redux';
import store from './src/store';
import ChangePasswordScreen from './src/Screens/ChangePasswordScreen';
import ChangeEmailScreen from './src/Screens/ChangeEmailScreen';
import ChangeProfileImageScreen from './src/Screens/ChangeProfileImageScreen';
import OTPScreen from './src/Screens/OTPScreen';
import ForgotScreen from './src/Screens/ForgotScreen';
import NewPasswordScreen from './src/Screens/NewPasswordScreen';
import ForgotPasswordOTPScreen from './src/Screens/ForgotPasswordOTPScreen';


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
const Stack = createStackNavigator();


const GradientHeader = () => (
  <View style={{ flex: 1 }}>
    <LinearGradient
      colors={['#312537', '#7440AE',"#7A4BAB"]}
      style={{ flex: 1 }}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 1 }}
    />
  </View>
);
const App = () => {
  return (
    <Provider store={store}>

 <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{headerShown:false}}
      />
   
       <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{
        headerShown: false, // Hide the header
        tabBarLabel: '', // Hide tab label
      }}
    
      // options={{
      //   headerTitle: () => <TopBar/>,
      //   headerStyle: { backgroundColor: '#7A4BAB' }, 
      //     tabBarStyle: { backgroundColor: '#9F69D8' },
      //   }}
    />

<Stack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={{headerShown:false}}
      />

<Stack.Screen
      name="ChangeEmailScreen"
      component={ChangeEmailScreen}
      options={{headerShown:false}}
      />
<Stack.Screen
      name="Forgot"
      component={ForgotScreen}
      options={{headerShown:false}}
      />
<Stack.Screen
      name="NewPassword"
      component={NewPasswordScreen}
      options={{headerShown:false}}
      />

<Stack.Screen
      name="ChangeProfileImageScreen"
      component={ChangeProfileImageScreen}
      options={{headerShown:false}}
      />
<Stack.Screen
      name="OTPScreen"
      component={OTPScreen}
      options={{headerShown:false}}
      />
<Stack.Screen
      name="ForgotOTP"
      component={ForgotPasswordOTPScreen}
      options={{headerShown:false}}
      />

      </Stack.Navigator>
    </NavigationContainer>

    </Provider>
   
  );
};

export default App;
