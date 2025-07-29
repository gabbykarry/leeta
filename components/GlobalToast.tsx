import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from "react-native";
import {
  CircleCheck as CheckCircle,
  Circle as XCircle,
  Info,
  Package,
} from "lucide-react-native";
import {
  scaleFontSize,
  scaleHeight,
  scaleWidth,
  spacing,
} from "@/utils/helpers";
import { useToastStore } from "@/store/toastSlice";

const ChipsToast = () => {
  const { type, message, hideToast } = useToastStore();
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (type && message) {
      slideAnim.setValue(-100);
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      bounceAnim.setValue(0);

      const entranceAnimation = Animated.sequence([
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 150,
            friction: 10,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 100,
            easing: Easing.elastic(2),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -1,
            duration: 100,
            easing: Easing.elastic(2),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 100,
            easing: Easing.elastic(2),
            useNativeDriver: true,
          }),
        ]),

        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]);

      entranceAnimation.start();

      const timer = setTimeout(() => {
        const exitAnimation = Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.back(1.7)),
            useNativeDriver: true,
          }),
        ]);

        exitAnimation.start(() => hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [type, message]);

  if (!type || !message) return null;

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          backgroundColor: "#000000",
          borderColor: "#32CD32",
          iconColor: "#32CD32",
          textColor: "#32CD32",
          shadowColor: "#32CD32",
        };
      case "error":
        return {
          icon: XCircle,
          backgroundColor: "#000000",
          borderColor: "#FF4444",
          iconColor: "#FF4444",
          textColor: "#FF4444",
          shadowColor: "#FF4444",
        };
      case "info":
        return {
          icon: Info,
          backgroundColor: "#000000",
          borderColor: "#FFD700",
          iconColor: "#FFD700",
          textColor: "#FFD700",
          shadowColor: "#FFD700",
        };
      default:
        return {
          icon: Package,
          backgroundColor: "#000000",
          borderColor: "#FFD700",
          iconColor: "#FFD700",
          textColor: "#FFD700",
          shadowColor: "#FFD700",
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-3deg", "0deg", "3deg"],
  });

  const bounceInterpolation = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
          shadowColor: config.shadowColor,
          transform: [
            { translateY: slideAnim },
            { scale: Animated.multiply(scaleAnim, bounceInterpolation) },
            { rotate: rotateInterpolation },
          ],
        },
      ]}
    >
      <TouchableWithoutFeedback onPress={hideToast}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <IconComponent
              size={24}
              color={config.iconColor}
              strokeWidth={2.5}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.toastText, { color: config.textColor }]}>
              {message}
            </Text>
          </View>

          {/* dots */}
          <View style={styles.dotsContainer}>
            <View
              style={[
                styles.dot,
                { backgroundColor: config.borderColor, opacity: 0.6 },
              ]}
            />
            <View
              style={[
                styles.dot,
                { backgroundColor: config.borderColor, opacity: 0.4 },
              ]}
            />
            <View
              style={[
                styles.dot,
                { backgroundColor: config.borderColor, opacity: 0.2 },
              ]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: spacing(50),
    left: spacing(20),
    right: spacing(20),
    paddingVertical: spacing(16),
    paddingHorizontal: spacing(20),
    borderRadius: 16,
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: spacing(12),
    padding: spacing(4),
  },
  textContainer: {
    flex: 1,
    marginRight: spacing(12),
  },
  toastText: {
    fontSize: scaleFontSize(16),
    fontWeight: "600",
    lineHeight: spacing(22),
  },
  dotsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: spacing(3),
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default ChipsToast;
