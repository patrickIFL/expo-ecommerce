import { useSettingsStyles } from '@/assets/styles/styles';
import Preferences from '@/components/Preferences';
import ProgressStats from '@/components/ProgressStats';
import TitleHeader from '@/components/TitleHeader';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView } from 'react-native';
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
        <TitleHeader title="Settings" />

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