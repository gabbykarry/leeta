import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Product } from "@/data/products";
import {
  scale,
  scaleFontSize,
  scaleHeight,
  scaleWidth,
  spacing,
} from "@/utils/helpers";
import { ShoppingBasket } from "lucide-react-native";
import { useProductStore } from "@/store/productSlice";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function ChipItem({ item }: { item: Product }) {
  const addToCart = useProductStore((state) => state.addToCart);
  return (
    <ImageBackground
      source={typeof item.image === "string" ? { uri: item.image } : item.image}
      style={[
        styles.imageBg,
        {
          backgroundColor: item.color,
        },
      ]}
      //   resizeMode="none"
    >
      <View style={styles.textView}>
        <View>
          {item.name.split(" ").map((word, index) => (
            <Text key={index} style={styles.name}>
              {word}
            </Text>
          ))}
        </View>
        <View style={styles.typeView}>
          <Text style={styles.text}>
            {item.category === "Chocolates" ? "Choco" : item.category}
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={["#FFFFFF", "rgba(255, 255, 255, 0.6)"]}
        style={styles.blurBg}
      >
        <BlurView
          intensity={100}
          style={styles.glassyBg}
          experimentalBlurMethod="dimezisBlurView"
        >
          <Text style={styles.price}>₦{item.price}</Text>
          <TouchableOpacity
            onPress={() => addToCart(item)}
            hitSlop={20}
            style={styles.btn}
          >
            <ShoppingBasket size={scale(13)} color={"white"} />
          </TouchableOpacity>
        </BlurView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBg: {
    width: scaleWidth(170),
    height: scaleHeight(230),
    borderRadius: 30,
    paddingHorizontal: spacing(15),
    paddingVertical: spacing(20),
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "ExtraBold",
    fontSize: scaleFontSize(18),
    color: "black",
  },
  textView: {
    gap: spacing(10),
  },
  typeView: {
    width: scaleWidth(50),
    height: scaleHeight(25),
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Light",
    fontSize: scaleFontSize(11),
    color: "black",
  },
  btn: {
    backgroundColor: "black",
    width: scaleWidth(35),
    height: scaleHeight(30),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontFamily: "Bold",
    fontSize: scaleFontSize(15),
    color: "black",
  },
  glassyBg: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: spacing(10),
    paddingVertical: spacing(8),
  },
  blurBg: {
    borderRadius: 35,
    overflow: "hidden",
  },
});
