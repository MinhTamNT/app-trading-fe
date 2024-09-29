import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

const Carousel = () => {
  const slides = [
    { image: require("../../assets/images/slide.png") },
    { image: require("../../assets/images/slide.png") },
    { image: require("../../assets/images/slide.png") },
  ];

  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<number | null>(null);

  const autoSlideInterval = 3000; // Time interval in milliseconds for auto-slide

  // Adjust scrollEventThrottle for smoother updates
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setActiveIndex(index);
  };

  // Auto-slide logic
  useEffect(() => {
    // Function to auto-slide
    const autoSlide = () => {
      const nextIndex = activeIndex + 1 >= slides.length ? 0 : activeIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    };

    // Set up interval for auto-slide
    intervalRef.current = setInterval(autoSlide, autoSlideInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval when the component unmounts
      }
    };
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={1}
        ref={scrollRef}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
          </View>
        ))}
      </Animated.ScrollView>

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.Text key={index} style={[styles.indicator, { opacity }]}>
              ●
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "95%",
    height: 180,
    borderRadius: 15,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, // Adds shadow for Android
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    fontSize: 14, // Slightly larger for visibility
    marginHorizontal: 6,
    color: "#888", // Lighter color for inactive indicators
  },
});
