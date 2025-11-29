import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function JoinScreen() {
  const primaryColor = "#0C3B2E";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const availableAuctions = [
    {
      id: 1,
      name: "Premier League Auction 2026",
      organizer: "Cricket Club Mumbai",
      startDate: "Dec 25, 2025",
      startTime: "2:00 PM",
      basePrice: "1.5 Cr",
      maxTeams: 12,
      joinedTeams: 8,
      type: "cricket",
      isPrivate: false,
      status: "upcoming",
    },
    {
      id: 2,
      name: "Champions League Mini",
      organizer: "Sports Arena",
      startDate: "Jan 5, 2026",
      startTime: "6:00 PM",
      basePrice: "2.0 Cr",
      maxTeams: 8,
      joinedTeams: 6,
      type: "football",
      isPrivate: false,
      status: "upcoming",
    },
    {
      id: 3,
      name: "Local T20 Tournament",
      organizer: "City Sports Club",
      startDate: "Dec 20, 2025",
      startTime: "4:00 PM",
      basePrice: "0.8 Cr",
      maxTeams: 6,
      joinedTeams: 4,
      type: "cricket",
      isPrivate: false,
      status: "live",
    },
    {
      id: 4,
      name: "Private Elite League",
      organizer: "Elite Sports",
      startDate: "Jan 15, 2026",
      startTime: "3:00 PM",
      basePrice: "5.0 Cr",
      maxTeams: 10,
      joinedTeams: 7,
      type: "cricket",
      isPrivate: true,
      status: "upcoming",
    },
  ];

  const filters = [
    { id: "all", name: "All", count: availableAuctions.length },
    { id: "cricket", name: "Cricket", count: availableAuctions.filter(a => a.type === "cricket").length },
    { id: "football", name: "Football", count: availableAuctions.filter(a => a.type === "football").length },
    { id: "live", name: "Live", count: availableAuctions.filter(a => a.status === "live").length },
  ];

  const filteredAuctions = availableAuctions.filter((auction) => {
    const matchesSearch = auction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "live") return matchesSearch && auction.status === "live";
    return matchesSearch && auction.type === activeFilter;
  });

  const handleJoinAuction = (auction: any) => {
    if (auction.isPrivate) {
      Alert.alert(
        "Private Auction",
        "This is a private auction. You need an invitation code to join.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Enter Code", onPress: () => {
            // Show invitation code input
            Alert.prompt("Invitation Code", "Enter the invitation code:", (code) => {
              if (code) {
                Alert.alert("Success", `Joined ${auction.name} successfully!`);
              }
            });
          }},
        ]
      );
    } else {
      Alert.alert(
        "Join Auction",
        `Do you want to join "${auction.name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Join", onPress: () => {
            Alert.alert("Success", `Joined ${auction.name} successfully!`);
          }},
        ]
      );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cricket": return "baseball-outline";
      case "football": return "football-outline";
      default: return "trophy-outline";
    }
  };

  const renderAuctionCard = (auction: any) => (
    <View key={auction.id} style={styles.auctionCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.auctionInfo}>
          <View style={styles.titleRow}>
            <Ionicons 
              name={getTypeIcon(auction.type) as any} 
              size={20} 
              color={primaryColor} 
            />
            <ThemedText style={styles.auctionName}>{auction.name}</ThemedText>
          </View>
          <ThemedText style={styles.organizer}>by {auction.organizer}</ThemedText>
        </View>
        
        <View style={styles.badgeContainer}>
          {auction.status === "live" && (
            <View style={[styles.badge, { backgroundColor: "#EF4444" }]}>
              <View style={styles.liveDot} />
              <ThemedText style={styles.badgeText}>LIVE</ThemedText>
            </View>
          )}
          {auction.isPrivate && (
            <View style={[styles.badge, { backgroundColor: "#8B5CF6" }]}>
              <Ionicons name="lock-closed" size={12} color="#fff" />
              <ThemedText style={styles.badgeText}>Private</ThemedText>
            </View>
          )}
        </View>
      </View>

      {/* Details */}
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailText}>
            {auction.startDate} at {auction.startTime}
          </ThemedText>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailText}>
            Base Price: ₹{auction.basePrice}
          </ThemedText>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={16} color={primaryColor} />
          <ThemedText style={styles.detailText}>
            {auction.joinedTeams}/{auction.maxTeams} teams joined
          </ThemedText>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${(auction.joinedTeams / auction.maxTeams) * 100}%`,
                backgroundColor: auction.joinedTeams === auction.maxTeams ? "#EF4444" : "#14B8A6"
              }
            ]} 
          />
        </View>
        <ThemedText style={styles.progressText}>
          {Math.round((auction.joinedTeams / auction.maxTeams) * 100)}% full
        </ThemedText>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.viewButton}>
          <ThemedText style={styles.viewButtonText}>View Details</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.joinButton,
            { 
              backgroundColor: auction.joinedTeams === auction.maxTeams 
                ? "#ccc" 
                : primaryColor 
            }
          ]}
          onPress={() => handleJoinAuction(auction)}
          disabled={auction.joinedTeams === auction.maxTeams}
        >
          <ThemedText style={styles.joinButtonText}>
            {auction.joinedTeams === auction.maxTeams ? "Full" : "Join"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <ThemedText style={styles.headerTitle}>Join Auctions</ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="filter-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search auctions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              activeFilter === filter.id && { backgroundColor: primaryColor },
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <ThemedText
              style={[
                styles.filterText,
                activeFilter === filter.id && { color: "#fff" },
              ]}
            >
              {filter.name} ({filter.count})
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Auction List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map(renderAuctionCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <ThemedText style={styles.emptyTitle}>No Auctions Found</ThemedText>
            <ThemedText style={styles.emptyText}>
              {searchQuery 
                ? `No auctions match "${searchQuery}"`
                : "No auctions available in this category"
              }
            </ThemedText>
          </View>
        )}
        
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 10,
  },
  filterText: {
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  auctionInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  auctionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C3B2E",
    flex: 1,
  },
  organizer: {
    fontSize: 12,
    color: "#666",
  },
  badgeContainer: {
    gap: 4,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  cardDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0C3B2E",
    alignItems: "center",
  },
  viewButtonText: {
    color: "#0C3B2E",
    fontSize: 14,
    fontWeight: "600",
  },
  joinButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: {
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
