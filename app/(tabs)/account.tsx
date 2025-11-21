import { useHomeStyles } from '@/assets/styles/styles'
import MyOrders from '@/components/MyOrders'
import TitleHeader from '@/components/TitleHeader'
import UserProfile from '@/components/UserProfile'
import useTheme from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = () => {
  const {colors} = useTheme()
  const styles = useHomeStyles();
  
  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
          <StatusBar style={colors.statusBarStyle} />
          <SafeAreaView style={styles.safeArea}>
            <TitleHeader title='Account' />
            <UserProfile />
            <MyOrders/>
            
    
          </SafeAreaView>
        </LinearGradient>
  )
}

export default Account