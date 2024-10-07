import { RootState } from "@/Redux/store";
import { API, endPoints } from "@/config/appConfig";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import io from "socket.io-client"; // Import Socket.IO client
import { RootStackParamListTabs } from "./tabs";

const formatPrice = (price: number, symbol: string) => {
  const priceStr = price.toString();
  return !symbol.startsWith("VN30")
    ? priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : priceStr;
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

type HomeNavigateProps = NativeStackNavigationProp<RootStackParamListTabs>;

const Home: React.FC = () => {
  const [listRecommendedStocks, setListRecommendedStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<HomeNavigateProps>();
  const currentUser = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    const socket = io("http://10.10.92.101:5000");

    socket.on("recommendations_fetched", (data) => {
      console.log("Received recommendations:");
      setListRecommendedStocks(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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

  const renderHeader = () => {
    const avatarURL = currentUser?.createdAt
      ? currentUser.createdAt
      : `https://ui-avatars.com/api/?name=${currentUser?.first_name}+${currentUser?.last_name}&background=random`;

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={{ uri: avatarURL }} style={styles.userImage} />
          <View>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{currentUser?.last_name}</Text>
              <Text style={styles.userName}>{currentUser?.first_name}</Text>
            </View>
            <Text style={styles.userPhone}>{currentUser?.phone_number}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.trapezoidContainer}>
          <View style={styles.trapezoidTop} />
          <View style={styles.trapezoidContent}>
            <Text style={styles.titleText}>Danh mục đang nắm và theo dõi</Text>
          </View>
          <View style={styles.trapezoidBottom} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listRecommendedStocks}
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2B3A5D" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: "https://path-to-your-image.png" }} // Replace with your image URL
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>No recommendations available</Text>
              <Text style={styles.suggestionText}>
                Try refreshing or check back later!
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Light background for contrast
    paddingHorizontal: 16,
    paddingTop: 10,
    height: "100%",
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#2B3A5D", // Border around user image
  },
  userName: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
  userPhone: {
    color: "#555",
    fontSize: 16,
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
    fontSize: 22,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    padding: 5,
  },
  stockCode: {
    color: "#333",
  },
  dateCell: {
    color: "#333",
  },
  priceCell: {
    color: "#333",
  },
  profitCell: {
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  userNameContainer: {
    flexDirection: "row",
    gap: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  suggestionText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});

export default Home;
