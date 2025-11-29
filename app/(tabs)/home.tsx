import React from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { user } = useAuth();
  const primaryColor = "#0C3B2E";

  const upcomingAuctions = [
    { id: 1, name: "Premier League Auction", date: "Dec 15, 2025", teams: 8 },
    { id: 2, name: "Champions Cup", date: "Jan 20, 2026", teams: 12 },
    { id: 3, name: "Local Cricket League", date: "Feb 5, 2026", teams: 6 },
  ];

  const liveAuctions = [
    { id: 1, name: "IPL Mini Auction", bidding: "₹2.5 Cr", timeLeft: "2h 15m" },
    { id: 2, name: "T20 World Cup Prep", bidding: "₹1.8 Cr", timeLeft: "45m" },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: primaryColor }]}>
          <View>
            <ThemedText style={styles.welcomeText}>Welcome back,</ThemedText>
            <ThemedText style={styles.nameText}>{user?.name || "User"}</ThemedText>
          </View>
          <View style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Auctions Won</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#D4AF37" }]}>
            <ThemedText style={styles.statNumber}>₹8.5Cr</ThemedText>
            <ThemedText style={styles.statLabel}>Total Spent</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#14B8A6" }]}>
            <ThemedText style={styles.statNumber}>45</ThemedText>
            <ThemedText style={styles.statLabel}>Players Bought</ThemedText>
          </View>
        </View>

        {/* Live Auctions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>🔴 Live Auctions</ThemedText>
          {liveAuctions.map((auction) => (
            <View key={auction.id} style={styles.liveAuctionCard}>
              <View style={styles.liveIndicator} />
              <View style={styles.auctionInfo}>
                <ThemedText style={styles.auctionName}>{auction.name}</ThemedText>
                <ThemedText style={styles.auctionBidding}>
                  Current Bid: {auction.bidding}
                </ThemedText>
              </View>
              <View style={styles.timeContainer}>
                <ThemedText style={styles.timeLeft}>{auction.timeLeft}</ThemedText>
                <ThemedText style={styles.timeLabel}>left</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Upcoming Auctions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>📅 Upcoming Auctions</ThemedText>
          {upcomingAuctions.map((auction) => (
            <View key={auction.id} style={styles.auctionCard}>
              <View style={styles.auctionDetails}>
                <ThemedText style={styles.auctionName}>{auction.name}</ThemedText>
                <ThemedText style={styles.auctionDate}>{auction.date}</ThemedText>
                <ThemedText style={styles.auctionTeams}>{auction.teams} teams</ThemedText>
              </View>
              <View style={[styles.joinButton, { backgroundColor: primaryColor }]}>
                <ThemedText style={styles.joinButtonText}>Join</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>⚡ Quick Actions</ThemedText>
          <View style={styles.quickActions}>
            <View style={[styles.quickActionCard, { backgroundColor: primaryColor }]}>
              <Ionicons name="add-circle-outline" size={32} color="#fff" />
              <ThemedText style={styles.quickActionText}>Create Auction</ThemedText>
            </View>
            <View style={[styles.quickActionCard, { backgroundColor: "#D4AF37" }]}>
              <Ionicons name="search-outline" size={32} color="#fff" />
              <ThemedText style={styles.quickActionText}>Find Auctions</ThemedText>
            </View>
          </View>
        </View>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  nameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationIcon: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0C3B2E",
  },
  liveAuctionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    marginRight: 10,
  },
  auctionInfo: {
    flex: 1,
  },
  auctionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0C3B2E",
  },
  auctionBidding: {
    fontSize: 14,
    color: "#D4AF37",
    fontWeight: "500",
    marginTop: 2,
  },
  timeContainer: {
    alignItems: "center",
  },
  timeLeft: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#EF4444",
  },
  timeLabel: {
    fontSize: 12,
    color: "#666",
  },
  auctionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  auctionDetails: {
    flex: 1,
  },
  auctionDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  auctionTeams: {
    fontSize: 12,
    color: "#14B8A6",
    marginTop: 2,
  },
  joinButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    gap: 15,
  },
  quickActionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    gap: 10,
  },
  quickActionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
