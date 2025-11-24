import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TitleHeader = ({title }:{title:string}) => {
  const { colors } = useTheme();
  // const styles = useHomeStyles();
  const router = useRouter()
  
  return (
    <LinearGradient colors={colors.gradients.primary} style={styles.headerTitleSection}>
      <View style={styles.headerTitleWrapper}>
        <View style={styles.titleActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {router.back()}}
          >
            <View
              style={[styles.addButton]}
            >
              <Ionicons name='arrow-back' size={24} color={"#fff"} />

            </View>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.titleActions}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {router.push('/cart')}}
          >
            <View
              style={[styles.addButton]}
            >
              <Ionicons name='cart' size={24} color={"#fff"} />

            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {router.push('/chats')}}
          >
            <View
              style={[styles.addButton]}
            >
              <Ionicons name='chatbubble-ellipses' size={20} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  )
}

export default TitleHeader

// used in topsearch bar
const styles = StyleSheet.create({
  headerTitleWrapper: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
},

titleActions: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

headerTitleSection: {
  paddingHorizontal: 10,
  justifyContent:"center",
  alignItems:"center",
  paddingVertical: 7
},

title: {
  fontSize: 25,
  fontWeight: "500",
  letterSpacing: -1,
  color: "white",
},

addButton: {
  width: 40,
  height: 40,
  borderRadius: 28,
  justifyContent: "center",
  alignItems: "center",
},

})