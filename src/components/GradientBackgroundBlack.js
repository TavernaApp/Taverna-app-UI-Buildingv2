import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackgroundBlack = ({ children }) => {
  return (
    <LinearGradient
      colors={['#040506', '#040506',"#040506"]}
      style={styles.container}
    >
      <View style={styles.content}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 0,
  },
});

export default GradientBackgroundBlack;
