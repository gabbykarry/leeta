import CartBanner from "@/components/CartBanner";
import ChipItem from "@/components/ChipItem";
import Filters from "@/components/ScrollableFilters";
import { Product } from "@/data/products";
import { useProductStore } from "@/store/productSlice";
import { useToastStore } from "@/store/toastSlice";
import { scaleFontSize, spacing } from "@/utils/helpers";
import { LegendList } from "@legendapp/list";
import React, { useCallback, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home() {
  const showToast = useToastStore((state) => state.showToast);
  const options = useMemo(() => ["All", "Chips", "Choco"], []);
  const [selectedFilters, setSelectedFilters] = React.useState(options[0]);

  const products = useProductStore((state) => state.products);

  const filteredProducts = useMemo(() => {
    if (selectedFilters === "All") {
      return products;
    }

    if (selectedFilters === "Chips") {
      return products.filter((product) => product.category === "Chips");
    }

    if (selectedFilters === "Choco") {
      return products.filter((product) => product.category === "Chocolates");
    }

    return products;
  }, [selectedFilters, products]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ChipItem item={item} />,
    []
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: spacing(30),
            backgroundColor: "white",
          }}
          // bounces={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTextBold}>Chips</Text>
              <Text style={styles.headerText}>Collections</Text>
            </View>

            <Filters
              options={options}
              selectedOption={selectedFilters}
              setSelectedOption={setSelectedFilters}
            />

            <View style={styles.listView}>
              <LegendList
                data={filteredProducts}
                renderItem={renderItem}
                recycleItems={true}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                scrollEnabled={false}
                ListEmptyComponent={() => {
                  if (selectedFilters === "All") {
                    return <Text>No products found</Text>;
                  } else {
                    return <Text>No {selectedFilters} found</Text>;
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.cartBannerWrapper}>
        <CartBanner />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing(20),
    paddingTop: spacing(70),
    paddingBottom: spacing(80),
  },
  header: {
    gap: spacing(2),
  },
  headerTextBold: {
    fontFamily: "ExtraBold",
    fontSize: scaleFontSize(30),
  },
  headerText: {
    fontFamily: "Regular",
    fontSize: scaleFontSize(30),
  },
  listView: {
    flex: 1,
    marginVertical: spacing(40),
  },
  flatListContainer: {
    flexGrow: 1,
    gap: spacing(10),
  },
  cartBannerWrapper: {
    position: "absolute",
    bottom: spacing(10),
    left: spacing(2),
    right: spacing(2),
    zIndex: 100,
  },
});
