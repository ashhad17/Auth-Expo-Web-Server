import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";
import ProfileCard from "@/components/ProfileCard";
import ProtectedRequestCard from "@/components/ProtectedRequestCard";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const primaryColor = "#0C3B2E";

  const profileStats = [
    { label: "Auctions Won", value: "12", icon: "trophy-outline" },
    { label: "Total Spent", value: "₹8.5Cr", icon: "card-outline" },
    { label: "Players Owned", value: "45", icon: "people-outline" },
    { label: "Success Rate", value: "75%", icon: "trending-up-outline" },
  ];

  const menuItems = [
    { id: "edit", title: "Edit Profile", icon: "person-outline" },
    { id: "settings", title: "Settings", icon: "settings-outline" },
    { id: "notifications", title: "Notifications", icon: "notifications-outline" },
    { id: "privacy", title: "Privacy & Security", icon: "shield-outline" },
    { id: "help", title: "Help & Support", icon: "help-circle-outline" },
    { id: "about", title: "About", icon: "information-circle-outline" },
  ];

  const handleMenuPress = (itemId: string) => {
    switch (itemId) {
      case "edit":
        Alert.alert("Edit Profile", "Profile editing feature coming soon!");
        break;
      case "settings":
        Alert.alert("Settings", "Settings page coming soon!");
        break;
      case "notifications":
        Alert.alert("Notifications", "Notification settings coming soon!");
        break;
      case "privacy":
        Alert.alert("Privacy & Security", "Privacy settings coming soon!");
        break;
      case "help":
        Alert.alert("Help & Support", "Help center coming soon!");
        break;
      case "about":
        Alert.alert("About Auctionade", "Version 1.0.0\n\nLive Cricket Player Auctions");
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive", 
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              console.error("Error signing out:", error);
            }
          }
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <ProfileCard />
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <ThemedText style={styles.sectionTitle}>📊 Your Stats</ThemedText>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Ionicons name={stat.icon as any} size={24} color={primaryColor} />
                <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* API Test Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>🔧 API Test</ThemedText>
          <ProtectedRequestCard />
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>⚙️ Settings</ThemedText>
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIconContainer, { backgroundColor: `${primaryColor}15` }]}>
                    <Ionicons name={item.icon as any} size={20} color={primaryColor} />
                  </View>
                  <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>🏆 Recent Achievements</ThemedText>
          <View style={styles.achievementContainer}>
            <View style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: "#D4AF37" }]}>
                <Ionicons name="trophy" size={20} color="#fff" />
              </View>
              <View style={styles.achievementInfo}>
                <ThemedText style={styles.achievementTitle}>First Victory</ThemedText>
                <ThemedText style={styles.achievementDesc}>Won your first auction</ThemedText>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: "#14B8A6" }]}>
                <Ionicons name="flash" size={20} color="#fff" />
              </View>
              <View style={styles.achievementInfo}>
                <ThemedText style={styles.achievementTitle}>Quick Bidder</ThemedText>
                <ThemedText style={styles.achievementDesc}>Made 10 bids in one auction</ThemedText>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <View style={[styles.achievementIcon, { backgroundColor: "#8B5CF6" }]}>
                <Ionicons name="people" size={20} color="#fff" />
              </View>
              <View style={styles.achievementInfo}>
                <ThemedText style={styles.achievementTitle}>Team Builder</ThemedText>
                <ThemedText style={styles.achievementDesc}>Built a complete team of 11 players</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcon: {
    padding: 8,
  },
  profileSection: {
    padding: 20,
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C3B2E",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0C3B2E",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  achievementContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0C3B2E",
  },
  achievementDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
    gap: 10,
  },
  signOutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
});
