import { useSettingsStyles } from '@/assets/styles/styles';
// import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
// import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const ProgressStats = () => {
  const { colors } = useTheme();
  const styles = useSettingsStyles();
//   const todos = useQuery(api.todos.getTodos);
//   const totalTodos = todos ? todos.length : 0;
//   const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
//   const activeTodos = totalTodos - completedTodos;

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>

      <Text style={styles.sectionTitle}>
        Orders
      </Text>

      <View style={styles.statsContainer}>

        {/* Total */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.statIcon}>
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={styles.statNumber}>{/*totalTodos*/}10</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>


        </LinearGradient>

        {/* Completed */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient colors={colors.gradients.success} style={styles.statIcon}>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={styles.statNumber}>{/*completedTodos*/}10</Text>
            <Text style={styles.statLabel}>Completed Orders</Text>
          </View>


        </LinearGradient>

        {/* Pending */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient colors={colors.gradients.warning} style={styles.statIcon}>
              <Ionicons name="time-outline" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={styles.statNumber}>{/*activeTodos*/}10</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </View>


        </LinearGradient>
      </View>


    </LinearGradient>
  )
}

export default ProgressStats