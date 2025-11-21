import { useHomeStyles } from '@/assets/styles/styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { /*Alert,*/ TextInput, TouchableOpacity, View } from 'react-native';

const TopSearchBar = () => {
  const { colors } = useTheme();
  const styles = useHomeStyles();
  const router = useRouter()


  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='Search Products'
          placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {router.push('/cart')}}
        >
          <LinearGradient
            colors={colors.gradients.primary} 
            style={[styles.addButton]}
          >
            <Ionicons name='cart' size={18} color={"#fff"} />

          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {router.push('/chats')}}
        >
          <LinearGradient
            colors={colors.gradients.primary} 
            style={[styles.addButton]}
          >
            <Ionicons name='chatbubble-ellipses' size={18} color={"#fff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TopSearchBar