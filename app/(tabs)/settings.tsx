import { useSettingsStyles } from '@/assets/styles/styles';
import Preferences from '@/components/Preferences';
import ProgressStats from '@/components/ProgressStats';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const styles = useSettingsStyles();

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header Area */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.iconContainer}>
              <Ionicons name='settings' size={28} color={'#FFF'} />
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preferences />
          {/* <DangerZone /> */}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen