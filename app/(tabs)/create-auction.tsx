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

export default function CreateAuctionScreen() {
  const primaryColor = "#0C3B2E";
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "",
    basePrice: "",
    maxTeams: "",
    auctionType: "cricket",
    isPrivate: false,
  });

  const auctionTypes = [
    { id: "cricket", name: "Cricket", icon: "baseball-outline" },
    { id: "football", name: "Football", icon: "football-outline" },
    { id: "basketball", name: "Basketball", icon: "basketball-outline" },
    { id: "custom", name: "Custom", icon: "settings-outline" },
  ];

  const handleCreateAuction = () => {
    if (!formData.name || !formData.startDate || !formData.basePrice) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    Alert.alert("Success", "Auction created successfully!", [
      { text: "OK", onPress: () => {
        // Reset form
        setFormData({
          name: "",
          description: "",
          startDate: "",
          startTime: "",
          basePrice: "",
          maxTeams: "",
          auctionType: "cricket",
          isPrivate: false,
        });
      }},
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <ThemedText style={styles.headerTitle}>Create Auction</ThemedText>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="help-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>📝 Basic Information</ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Auction Name *</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="e.g., Premier League Auction 2026"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Description</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your auction..."
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
          </View>
        </View>

        {/* Auction Type */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>🏆 Auction Type</ThemedText>
          <View style={styles.typeContainer}>
            {auctionTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  formData.auctionType === type.id && {
                    backgroundColor: primaryColor,
                  },
                ]}
                onPress={() =>
                  setFormData({ ...formData, auctionType: type.id })
                }
              >
                <Ionicons
                  name={type.icon as any}
                  size={32}
                  color={
                    formData.auctionType === type.id ? "#fff" : primaryColor
                  }
                />
                <ThemedText
                  style={[
                    styles.typeName,
                    formData.auctionType === type.id && { color: "#fff" },
                  ]}
                >
                  {type.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Schedule */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>⏰ Schedule</ThemedText>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>Start Date *</ThemedText>
              <TouchableOpacity style={styles.dateInput}>
                <Ionicons name="calendar-outline" size={20} color={primaryColor} />
                <TextInput
                  style={styles.dateText}
                  placeholder="DD/MM/YYYY"
                  value={formData.startDate}
                  onChangeText={(text) =>
                    setFormData({ ...formData, startDate: text })
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>Start Time *</ThemedText>
              <TouchableOpacity style={styles.dateInput}>
                <Ionicons name="time-outline" size={20} color={primaryColor} />
                <TextInput
                  style={styles.dateText}
                  placeholder="HH:MM"
                  value={formData.startTime}
                  onChangeText={(text) =>
                    setFormData({ ...formData, startTime: text })
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Auction Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>⚙️ Settings</ThemedText>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>Base Price *</ThemedText>
              <View style={styles.priceInput}>
                <ThemedText style={styles.currency}>₹</ThemedText>
                <TextInput
                  style={styles.priceText}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={formData.basePrice}
                  onChangeText={(text) =>
                    setFormData({ ...formData, basePrice: text })
                  }
                />
                <ThemedText style={styles.currency}>Cr</ThemedText>
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>Max Teams</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="e.g., 8"
                keyboardType="numeric"
                value={formData.maxTeams}
                onChangeText={(text) =>
                  setFormData({ ...formData, maxTeams: text })
                }
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() =>
              setFormData({ ...formData, isPrivate: !formData.isPrivate })
            }
          >
            <View style={styles.toggleInfo}>
              <ThemedText style={styles.toggleLabel}>Private Auction</ThemedText>
              <ThemedText style={styles.toggleDescription}>
                Only invited users can join
              </ThemedText>
            </View>
            <View
              style={[
                styles.toggle,
                formData.isPrivate && { backgroundColor: primaryColor },
              ]}
            >
              <View
                style={[
                  styles.toggleThumb,
                  formData.isPrivate && styles.toggleThumbActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Preview Card */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>👀 Preview</ThemedText>
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <ThemedText style={styles.previewName}>
                {formData.name || "Auction Name"}
              </ThemedText>
              <View
                style={[
                  styles.previewBadge,
                  { backgroundColor: formData.isPrivate ? "#EF4444" : "#14B8A6" },
                ]}
              >
                <ThemedText style={styles.previewBadgeText}>
                  {formData.isPrivate ? "Private" : "Public"}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.previewDescription}>
              {formData.description || "No description provided"}
            </ThemedText>
            <View style={styles.previewDetails}>
              <ThemedText style={styles.previewDetail}>
                📅 {formData.startDate || "TBD"} at {formData.startTime || "TBD"}
              </ThemedText>
              <ThemedText style={styles.previewDetail}>
                💰 Base Price: ₹{formData.basePrice || "0"} Cr
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: primaryColor }]}
          onPress={handleCreateAuction}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <ThemedText style={styles.createButtonText}>Create Auction</ThemedText>
        </TouchableOpacity>

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C3B2E",
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0C3B2E",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  typeCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  typeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0C3B2E",
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  priceInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  currency: {
    fontSize: 16,
    color: "#0C3B2E",
    fontWeight: "600",
  },
  priceText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0C3B2E",
  },
  toggleDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    padding: 2,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },
  previewCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  previewName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C3B2E",
    flex: 1,
  },
  previewBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  previewBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  previewDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  previewDetails: {
    gap: 4,
  },
  previewDetail: {
    fontSize: 12,
    color: "#0C3B2E",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
