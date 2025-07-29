import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions that we're designing for
// Change these values to match your design specifications
const baseWidth = 375; // iPhone X width
const baseHeight = 812; // iPhone X height

// Determine scale ratio based on current device width vs. base width
const widthRatio = SCREEN_WIDTH / baseWidth;
const heightRatio = SCREEN_HEIGHT / baseHeight;

// We'll use a combination of width and height scaling
// This prevents excessive scaling on tablets
const ratio = Math.min(widthRatio, heightRatio);

/**
 * Scale a value based on the device screen size
 * @param size - The original size in pixels
 * @param factor - Optional factor to adjust the scaling (default: 0.5)
 * @returns The scaled size
 */
export const scale = (size: number, factor: number = 0.5): number => {
  // We apply a factor to prevent too aggressive scaling
  const scaledSize = size + size * (ratio - 1) * factor;
  return Math.round(scaledSize);
};

/**
 * Scale font size with platform specific adjustments
 * @param size - The original font size
 * @returns The scaled font size
 */
export const scaleFontSize = (size: number): number => {
  const newSize = scale(size, 0.4);

  // Different pixel densities on Android vs iOS
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // Android sometimes needs slightly larger fonts
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 1;
  }
};

/**
 * Horizontal scale - scales values specifically for horizontal dimensions
 * @param size - The original size
 * @returns The horizontally scaled size
 */
export const scaleWidth = (size: number): number => {
  return Math.round(size * widthRatio);
};

/**
 * Vertical scale - scales values specifically for vertical dimensions
 * @param size - The original size
 * @returns The vertically scaled size
 */
export const scaleHeight = (size: number): number => {
  return Math.round(size * heightRatio);
};

/**
 * Calculate appropriate spacing for different screen sizes
 * @param size - Original spacing value
 * @returns The scaled spacing
 */
export const spacing = (size: number): number => {
  return scale(size, 0.3);
};
