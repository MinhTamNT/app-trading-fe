import { API, endPoints } from "@/config/appConfig";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatPrice = (price: number, symbol: string) => {
  const priceStr = price.toString();

  if (!symbol.startsWith("VN30")) {
    return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return priceStr;
  }
};

const formatProfit = (profit: number) => {
  return profit.toFixed(2);
};

const formatVietnameseDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Welcome: React.FC = () => {
  const [listRecommendedStocks, setListRecommendedStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchRecommendedStocks = async () => {
      try {
        const response = await API().get(endPoints["get-recommend"]);
        setListRecommendedStocks(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedStocks();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.stockCode]}>{item.symbol}</Text>
        <Text style={[styles.tableCell, styles.dateCell]}>
          {formatVietnameseDate(item.date)}
        </Text>
        <Text style={[styles.tableCell, styles.priceCell]}>
          {formatPrice(item.priceRecommend, item.symbol)}{" "}
        </Text>
        <Text style={[styles.tableCell, styles.priceCell]}>
          {formatPrice(item.current_price, item.symbol)}{" "}
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.profitCell,
            { color: item.profit > 0 ? "green" : "red" },
          ]}
        >
          {formatProfit(item.profit)} %
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.trapezoidContainer}>
          <View style={styles.trapezoidTop} />
          <View style={styles.trapezoidContent}>
            <Text style={styles.titleText}>Danh mục đang nắm giữ</Text>
          </View>
          <View style={styles.trapezoidBottom} />
        </View>
      </View>
      <View style={styles.stockContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Mã CK</Text>
          <Text style={styles.tableHeaderText}>Ngày Mua</Text>
          <Text style={styles.tableHeaderText}>Giá Mua</Text>
          <Text style={styles.tableHeaderText}>Giá Hiện Tại</Text>
          <Text style={styles.tableHeaderText}>Lợi Nhuận</Text>
        </View>

        {loading ? ( // Show loading indicator while loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2B3A5D" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={listRecommendedStocks}
            renderItem={renderItem}
            keyExtractor={(item) => item.symbol}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  trapezoidContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  trapezoidTop: {
    width: "100%",
    height: 0,
    borderTopWidth: 30,
    borderBottomColor: "#2B3A5D",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "relative",
  },
  trapezoidContent: {
    width: "100%",
    backgroundColor: "#2B3A5D",
    alignItems: "center",
    paddingVertical: 10,
    position: "absolute",
  },
  trapezoidBottom: {
    width: "100%",
    height: 0,
    borderTopColor: "#2B3A5D",
  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  stockContainer: {
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2B3A5D",
    paddingVertical: 12,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 5,
    textAlign: "left",
  },
  stockCode: {
    fontWeight: "bold",
    color: "green",
  },
  dateCell: {
    textAlign: "center",
  },
  priceCell: {
    textAlign: "right",
  },
  profitCell: {
    textAlign: "right",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default Welcome;
