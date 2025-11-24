import { useHomeStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const EmptyState = () => {
  const { colors } = useTheme();
  const homeStyles = useHomeStyles();

  return (
    <View style={homeStyles.emptyContainer}>
      {/* Big clipboard Circle */}
      <LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
        <Ionicons name="cart-outline" size={60} color={colors.textMuted} />
      </LinearGradient>

      <Text style={homeStyles.emptyText}>Coming Soon</Text>
      <Text style={homeStyles.emptySubtext}>We are working on something great. Check again soon!</Text>

    </View>
  );
};
export default EmptyState;