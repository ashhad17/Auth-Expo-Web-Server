import React, { useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function MyAuctionsScreen() {
  const primaryColor = "#0C3B2E";
  const [activeTab, setActiveTab] = useState("active");

  const activeAuctions = [
    {
      id: 1,
      name: "Premier League Auction",
      status: "Live",
      myBid: "₹5.2 Cr",
      timeLeft: "1h 30m",
      position: "Leading",
    },
    {
      id: 2,
      name: "Champions Cup",
      status: "Upcoming",
      myBid: "₹3.8 Cr",
      startTime: "Dec 20, 2:00 PM",
      position: "Registered",
    },
  ];

  const completedAuctions = [
    {
      id: 1,
      name: "T20 World Cup Prep",
      status: "Won",
      finalBid: "₹4.5 Cr",
      completedOn: "Dec 10, 2025",
      players: 15,
    },
    {
      id: 2,
      name: "Local Cricket League",
      status: "Lost",
      finalBid: "₹2.1 Cr",
      completedOn: "Nov 25, 2025",
      players: 0,
    },
  ];

  const renderActiveAuction = (auction: any) => (
    <View key={auction.id} style={styles.auctionCard}>
      <View style={styles.auctionHeader}>
        <ThemedText style={styles.auctionName}>{auction.name}</ThemedText>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                auction.status === "Live" ? "#EF4444" : "#D4AF37",
            },
          ]}
        >
          <ThemedText style={styles.statusText}>{auction.status}</ThemedText>
        </View>
      </View>

      <View style={styles.auctionDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailLabel}>My Bid:</ThemedText>
          <ThemedText style={styles.detailValue}>{auction.myBid}</ThemedText>
        </View>

        <View style={styles.detailItem}>
          <Ionicons
            name={auction.status === "Live" ? "time-outline" : "calendar-outline"}
            size={16}
            color={primaryColor}
          />
          <ThemedText style={styles.detailLabel}>
            {auction.status === "Live" ? "Time Left:" : "Starts:"}
          </ThemedText>
          <ThemedText style={styles.detailValue}>
            {auction.status === "Live" ? auction.timeLeft : auction.startTime}
          </ThemedText>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="trophy-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailLabel}>Position:</ThemedText>
          <ThemedText
            style={[
              styles.detailValue,
              {
                color:
                  auction.position === "Leading" ? "#14B8A6" : "#D4AF37",
              },
            ]}
          >
            {auction.position}
          </ThemedText>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: primaryColor }]}
        >
          <ThemedText style={styles.actionButtonText}>
            {auction.status === "Live" ? "Bid Now" : "View Details"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCompletedAuction = (auction: any) => (
    <View key={auction.id} style={styles.auctionCard}>
      <View style={styles.auctionHeader}>
        <ThemedText style={styles.auctionName}>{auction.name}</ThemedText>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: auction.status === "Won" ? "#14B8A6" : "#EF4444",
            },
          ]}
        >
          <ThemedText style={styles.statusText}>{auction.status}</ThemedText>
        </View>
      </View>

      <View style={styles.auctionDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailLabel}>Final Bid:</ThemedText>
          <ThemedText style={styles.detailValue}>{auction.finalBid}</ThemedText>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailLabel}>Completed:</ThemedText>
          <ThemedText style={styles.detailValue}>{auction.completedOn}</ThemedText>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="people-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailLabel}>Players:</ThemedText>
          <ThemedText style={styles.detailValue}>
            {auction.players} acquired
          </ThemedText>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#666" }]}
        >
          <ThemedText style={styles.actionButtonText}>View Details</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <ThemedText style={styles.headerTitle}>My Auctions</ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="filter-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "active" && { backgroundColor: primaryColor },
          ]}
          onPress={() => setActiveTab("active")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "active" && { color: "#fff" },
            ]}
          >
            Active ({activeAuctions.length})
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "completed" && { backgroundColor: primaryColor },
          ]}
          onPress={() => setActiveTab("completed")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "completed" && { color: "#fff" },
            ]}
          >
            Completed ({completedAuctions.length})
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "active" ? (
          <>
            {activeAuctions.length > 0 ? (
              activeAuctions.map(renderActiveAuction)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="list-outline" size={64} color="#ccc" />
                <ThemedText style={styles.emptyTitle}>No Active Auctions</ThemedText>
                <ThemedText style={styles.emptyText}>
                  Join an auction to see it here
                </ThemedText>
              </View>
            )}
          </>
        ) : (
          <>
            {completedAuctions.length > 0 ? (
              completedAuctions.map(renderCompletedAuction)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-circle-outline" size={64} color="#ccc" />
                <ThemedText style={styles.emptyTitle}>No Completed Auctions</ThemedText>
                <ThemedText style={styles.emptyText}>
                  Your completed auctions will appear here
                </ThemedText>
              </View>
            )}
          </>
        )}
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
  tabContainer: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  auctionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  auctionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  auctionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C3B2E",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  auctionDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0C3B2E",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
});
