import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

const LoadingSpinner = ({ size = 48, color = '#000' }: { size?: number; color?: string }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const {colors} = useTheme()

  useEffect(() => {
    const spin = () => {
      rotateAnim.setValue(0); // reset to 0 each loop
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear, // smooth uniform rotation
        useNativeDriver: true,
      }).start(() => spin()); // repeat infinitely
    };
    spin();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Ionicons name="cog-outline" size={size} color={colors.text} />
      </Animated.View>
      <Text style={{color: colors.text}}>Loading</Text>
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
