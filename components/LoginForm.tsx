// import { ThemedView } from "./ThemedView";
// import { ThemedText } from "./ThemedText";
// import { useAuth } from "@/context/auth";
// import SignInWithGoogleButton from "./SignInWithGoogleButton";
// import { Image, useColorScheme, View, StyleSheet } from "react-native";
// import { SignInWithAppleButton } from "./SignInWithAppleButton";

// export default function LoginForm() {
//   const { signIn, isLoading } = useAuth();
//   const theme = useColorScheme();

//   return (
//     <ThemedView style={styles.container}>
//       <View style={styles.card}>
//         <Image
//           source={
            
//               require("@/assets/images/icon-light.png")
//           }
//           style={styles.logo}
//         />

//         <View style={styles.contentContainer}>
//           <View style={styles.titleContainer}>
//             <ThemedText type="subtitle" style={styles.title}>
//               Welcome to Auctionade
//             </ThemedText>
            
//           </View>

//           <View style={styles.buttonContainer}>
//             <SignInWithGoogleButton onPress={signIn} disabled={isLoading} />
//             <SignInWithAppleButton />
//           </View>
//         </View>
//       </View>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   titleContainer: {
//     alignItems: "center",
//     gap: 12,
//   },
//   card: {
//     width: "100%",
//     maxWidth: 360,
//     alignItems: "center",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     resizeMode: "contain",
//     marginBottom: 32,
//   },
//   contentContainer: {
//     width: "100%",
//     gap: 32,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//   },
//   buttonContainer: {
//     width: "100%",
//     gap: 12,
//   },
//   description: {
//     textAlign: "center",
//     fontSize: 16,
//     color: "#666",
//     lineHeight: 24,
//   },
// });


// LoginFormWithThemeBackground.tsx
import React, { useEffect, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Image,
  useColorScheme,
  Platform,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useAuth } from "@/context/auth";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import { SignInWithAppleButton } from "./SignInWithAppleButton";

/**
 * Theme colors (use your central theme file instead if you have one)
 */
const colors = {
  primary: "#0C3B2E",
  gold: "#D4AF37",
  white: "#FFFFFF",
  grey: "#E5E7EB",
  teal: "#14B8A6",
  darkGrey: "#374151",
  lightGreen: "#D1FAE5",
  red: "#EF4444",
  purple: "#8B5CF6",
  softGrey: "#F9FAFB",
};

export default function LoginFormWithThemeBackground() {
  const { signIn, isLoading } = useAuth();
  const theme = useColorScheme();

  // Animations
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pulse3 = useRef(new Animated.Value(0)).current;
  const logoSpin = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(pulse1, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(pulse2, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse2, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(600),
        Animated.timing(pulse3, {
          toValue: 1,
          duration: 2800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse3, {
          toValue: 0,
          duration: 2800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(logoSpin, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      delay: 200,
    }).start();
  }, [pulse1, pulse2, pulse3, logoSpin, fadeIn]);

  const spin = logoSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const circleTransform = (anim: Animated.Value, minScale = 0.8, maxScale = 1.5) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [minScale, maxScale],
    });

  const circleOpacity = (anim: Animated.Value, minO = 0.12, maxO = 0.6) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [minO, maxO],
    });

  return (
    <ThemedView style={styles.wrapper}>
      {/* fallback gradient background — replace with LinearGradient for smoother result */}
      <View style={[StyleSheet.absoluteFill, styles.gradientFallback]} />

      

      {/* Foreground (logo + card) */}
      <Animated.View style={[styles.foreground, { opacity: fadeIn }]}>
        <View style={styles.logoContainer}>
          <View
            style={[
              styles.logoGlow,
              { backgroundColor: colors.teal, opacity: 0.16 },
            ]}
            pointerEvents="none"
          />
          <Animated.Image
            source={require("@/assets/images/icon-light.png")}
            style={[styles.logo]}
            resizeMode="contain"
          />
        </View>

        <ThemedText type="title" style={styles.title}>
          Auctionade
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Live Cricket Player Auctions
        </ThemedText>

        <View style={[styles.card, { backgroundColor: `${colors.primary}DD` }]}>
          <ThemedText style={styles.cardTitle}>Welcome to Auctionade</ThemedText>

          <View style={styles.buttonContainer}>
            <SignInWithGoogleButton onPress={signIn} disabled={isLoading} />
            <SignInWithAppleButton />
          </View>
        </View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: 16,
  },

  // simple fallback gradient using your primary + dark shade
  gradientFallback: {
    backgroundColor: colors.primary,
  },

  blob: {
    position: "absolute",
    borderRadius: 9999,
    // glow-like shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 40,
      },
      android: {
        elevation: 30,
      },
    }),
  },

  blob1: {
    width: 160,
    height: 160,
    top: 120,
    left: 40,
  },
  blob2: {
    width: 100,
    height: 100,
    bottom: 140,
    right: 50,
  },
  blob3: {
    width: 80,
    height: 80,
    top: "45%",
    right: "25%",
  },

  foreground: {
    zIndex: 10,
    alignItems: "center",
  },

  logoContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    position: "relative",
  },

  logoGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 180,
    transform: [{ scale: 1 }],
  },

  logo: {
    width: 110,
    height: 110,
  },

  title: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: `${colors.white}CC`,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 14,
    textAlign: "center",
  },

  buttonContainer: {
    width: "100%",
    gap: 12,
  },
});
