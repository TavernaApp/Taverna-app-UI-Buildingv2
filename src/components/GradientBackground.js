import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#312537', '#7440AE',"#7A4BAB"]}
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

export default GradientBackground;
