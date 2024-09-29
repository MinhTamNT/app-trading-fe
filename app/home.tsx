import { RootState } from "@/Redux/store";
import Carousel from "@/components/Carousel/Carousel";
import { API, endPoints } from "@/config/appConfig";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
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
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigation = useNavigation<HomeNavigateProps>(); // For navigation
  const currentUser = useSelector((state: RootState) => state.user.profile);
  console.log(currentUser);

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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigation.navigate("Profile")} // Navigate to Profile screen on press
      >
        <Image
          source={{
            uri:
              currentUser?.createdAt ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyahNWtYVSx-EUDdzxND4-GSBaVCc91PhoDzvx80_yQUyx5Vnqjlm6cz2nASVfWBtXOg8&usqp=CAU",
          }}
          style={styles.userImage}
        />
        <View>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{currentUser?.first_name}</Text>
            <Text style={styles.userName}>{currentUser?.last_name}</Text>
          </View>
          <Text style={styles.userPhone}>{currentUser?.phone_number}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <Carousel />
      <View style={styles.containerContent}>
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

        {loading ? (
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
    backgroundColor: "white",
    paddingHorizontal: 4,
    color: "#333",
    height: "100%",
  },
  headerContainer: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    color: "#333",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  userPhone: {
    color: "#333",
    fontSize: 14,
  },
  containerContent: {
    alignItems: "center",
    backgroundColor: "white",
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
    borderRadius: 10,
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
    borderRadius: 10,
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
  userNameContainer: {
    flexDirection: "row",
    gap: 2,
  },
});

export default Home;
