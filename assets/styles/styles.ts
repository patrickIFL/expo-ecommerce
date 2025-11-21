import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  // statusBarStyle: "light-content" | "dark-content";
  statusBarStyle: "light" | "dark";
}

export const lightColors: ColorScheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
  // primary: "#3b82f6",
  primary: "#ea580c",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  shadow: "#000000",
  gradients: {
    background: ["#f8fafc", "#e2e8f0"],
    surface: ["#ffffff", "#f8fafc"],
    // primary: ["#3b82f6", "#1d4ed8"],
    primary: ["#f97316", "#c2410c"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#9ca3af", "#6b7280"],
    empty: ["#f3f4f6", "#e5e7eb"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff",
  },
  // statusBarStyle: "dark-content" as const,
  statusBarStyle: "dark" as const,
};

export const darkColors: ColorScheme = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  // primary: "#60a5fa",
  primary: "#fb923c",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "#000000",
  gradients: {
    background: ["#0f172a", "#1e293b"],
    surface: ["#1e293b", "#334155"],
    // primary: ["#3b82f6", "#1d4ed8"],
    primary: ["#f97316", "#c2410c"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#374151", "#4b5563"],
    empty: ["#374151", "#4b5563"],
  },
  backgrounds: {
    input: "#1e293b",
    editInput: "#0f172a",
  },
  // statusBarStyle: "light-content" as const,
  statusBarStyle: "light" as const,
};

// styles hook
export const useHomeStyles = () => {
  const { colors } = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "500",
      color: colors.text,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 32,
      paddingBottom: 24,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    titleTextContainer: {
      flex: 1,
    },
    // title: {
    //   fontSize: 32,
    //   fontWeight: "700",
    //   letterSpacing: -1,
    //   marginBottom: 4,
    //   color: colors.text,
    // },
    subtitle: {
      fontSize: 17,
      fontWeight: "500",
      color: colors.textMuted,
    },
    progressContainer: {
      marginTop: 8,
    },
    progressBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    progressBar: {
      flex: 1,
      height: 12,
      borderRadius: 6,
      overflow: "hidden",
      backgroundColor: colors.border,
    },
    progressFill: {
      height: "100%",
      borderRadius: 6,
    },
    
    progressText: {
      fontSize: 16,
      fontWeight: "700",
      minWidth: 40,
      textAlign: "right",
      color: colors.success,
    },
    // used in topsearch bar
    inputSection: {
      paddingHorizontal: 10,
      paddingBottom: 12,
    },
    // used in topsearch bar
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
    input: {
      flex: 1,
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 17,
      maxHeight: 120,
      fontWeight: "500",
      backgroundColor: colors.backgrounds.input,
      borderColor: colors.border,
      color: colors.text,
    },
    inputFocused: {
      borderColor: colors.primary,
    },
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonDisabled: {
      opacity: 0.5,
    },
    todoList: {
      flex: 1,
    },
    todoListContent: {
      paddingHorizontal: 24,
      paddingBottom: 100,
    },
    emptyListContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    todoItemWrapper: {
      marginVertical: 12,
    },
    todoItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    checkbox: {
      marginRight: 16,
      marginTop: 2,
    },
    checkboxInner: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    todoTextContainer: {
      flex: 1,
    },
    todoText: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "500",
      marginBottom: 16,
      color: colors.text,
    },
    todoActions: {
      flexDirection: "row",
      gap: 12,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    editContainer: {
      flex: 1,
    },
    editInput: {
      borderWidth: 2,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 17,
      fontWeight: "500",
      marginBottom: 16,
      backgroundColor: colors.backgrounds.editInput,
      borderColor: colors.primary,
      color: colors.text,
    },
    editButtons: {
      flexDirection: "row",
      gap: 12,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
    },
    editButtonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    emptyText: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      color: colors.text,
    },
    emptySubtext: {
      fontSize: 17,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 24,
      color: colors.textMuted,
    },

    // Used in Product List
    title:{
        color: colors.text,
        paddingHorizontal:10,
        fontWeight: 500,
        fontSize: 25,
        marginBottom:5,
    },

    titleWrapper:{
        alignItems:"center"
    },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 10
  },

  card: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: colors.surface,
    borderRadius: 10,
    elevation: 2, // Android shadow
  },

  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  productText: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    gap:5,
    padding: 8,
    paddingBottom: 20,
    
  },

  priceRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5
  },

  name: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text
  },

  price: {
    marginTop: 2,
    textDecorationLine: 'line-through',
    fontSize: 11,
    color: colors.textMuted
  },

  offerPrice: {
    marginTop: 2,
    fontWeight: '600',
    color: colors.text
  },

  });

  return styles;
}

export const useSettingsStyles = () => {
  const { colors } = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 32,
      paddingBottom: 24,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      letterSpacing: -1,
      color: colors.text,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      paddingHorizontal: 20,
      gap: 20,
      paddingBottom: 120,
    },
    section: {
      borderRadius: 20,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8, // elevation is used to create a shadow on the section, in android
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 20,
      letterSpacing: -0.5,
      color: colors.text,
    },
    sectionTitleDanger: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 20,
      letterSpacing: -0.5,
      color: colors.danger,
    },
    statsContainer: {
      gap: 16,
    },
    statCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      borderRadius: 16,
      borderLeftWidth: 4,
    },
    statIconContainer: {
      marginRight: 16,
    },
    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    statNumber: {
      fontSize: 28,
      fontWeight: "800",
      letterSpacing: -1,
      color: colors.text,
    },
    statLabel: {
      fontSize: 14,
      fontWeight: "600",
      marginTop: 2,
      color: colors.textMuted,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    settingIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    settingText: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    actionLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    actionIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    actionText: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
    },
    actionTextDanger: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.danger,
    },
  });

  return styles;
}


