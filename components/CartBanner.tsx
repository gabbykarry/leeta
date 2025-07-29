import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useProductStore } from "@/store/productSlice";
import {
  scaleFontSize,
  scaleHeight,
  scaleWidth,
  spacing,
} from "@/utils/helpers";

export default function CartBanner() {
  const cartItems = useProductStore((state) => state.cart);
  const displayItems = cartItems.slice(0, 3);
  const totalItems = cartItems.length;

  const animRefs = useRef<Animated.Value[]>([]);

  useEffect(() => {
    while (animRefs.current.length < displayItems.length) {
      animRefs.current.push(new Animated.Value(0));
    }

    displayItems.forEach((_, index) => {
      animRefs.current[index].setValue(0);
      Animated.sequence([
        Animated.timing(animRefs.current[index], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(animRefs.current[index], {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [totalItems, displayItems]);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.contentContainer}>
        <View style={styles.countCircle}>
          <Text style={styles.countText}>{totalItems}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.cartText}>Cart</Text>
          <Text style={styles.itemCountText}>
            {totalItems} Item{totalItems !== 1 ? "s" : ""}
          </Text>
        </View>

        {/* Product images */}
        <View style={styles.imagesContainer}>
          {displayItems.map((item, index) => (
            <Animated.View
              key={`${item.id}-${index}`}
              style={[
                styles.imageWrapper,
                {
                  transform: [
                    { scale: animRefs.current[index] ?? new Animated.Value(1) },
                  ],
                  zIndex: displayItems.length + index,
                },
              ]}
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.productImage}
                resizeMode="cover"
              />
            </Animated.View>
          ))}

          {totalItems > 3 && (
            <View style={[styles.imageWrapper, styles.moreIndicator]}>
              <Text style={styles.moreText}>+{totalItems - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderRadius: 25,
    paddingVertical: spacing(35),
    paddingHorizontal: spacing(30),
    // marginHorizontal: 16,
    // marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countCircle: {
    width: scaleWidth(44),
    height: scaleHeight(44),
    borderRadius: 100,
    backgroundColor: "#F1C40F",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    textAlign: "center",
    fontSize: scaleFontSize(18),
    fontFamily: "ExtraBold",
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing(12),
  },
  cartText: {
    color: "#FFFFFF",
    fontSize: scaleFontSize(18),
    fontFamily: "Bold",
  },
  itemCountText: {
    color: "#A0A0A0",
    fontSize: scaleFontSize(14),
    fontFamily: "Medium",
    marginTop: spacing(2),
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    width: scaleWidth(50),
    height: scaleHeight(50),
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "black",
    marginLeft: spacing(-10),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },
  moreIndicator: {
    backgroundColor: "#4A4A4A",
    borderColor: "#6A6A6A",
    zIndex: 5,
  },
  moreText: {
    color: "#FFFFFF",
    fontSize: scaleFontSize(12),
    fontFamily: "Bold",
  },
});
