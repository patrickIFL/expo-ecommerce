import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to the App",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2glMjBzaG9wfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    title: "Great Offers Await",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMHNob3B8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "3",
    title: "Fast & Easy Experience",
    image: "https://media.istockphoto.com/id/2197955227/photo/humans-are-using-laptops-and-computers-to-interact-with-ai-helping-them-create-code-train-ai.webp?a=1&b=1&s=612x612&w=0&k=20&c=p8GsIZS4sS58ubkyslWk6ChVyDe5S4HDwxxznIsm-v4=",
  }
];

export default function HeaderSlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // ----------------------------
  // 🚀 Auto Scroll Effect
  // ----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;

      sliderRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setIndex(nextIndex);
    }, 5000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  const onScroll = (e) => {
    const slideIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={sliderRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { opacity: i === index ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 10
  },
  image: {
    width: width,
    height: 180,
  },
  title: {
    position: "absolute",
    bottom: 10,
    left: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "orange",
    marginHorizontal: 4,
  },
});
