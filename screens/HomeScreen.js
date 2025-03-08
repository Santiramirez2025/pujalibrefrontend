import React, { useEffect, useCallback } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  Platform 
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store"; 
import { setAuctions } from "../app/store/slices/auctionSlice"; 
import { fetchAuctions } from "@utils/api";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auctions = useSelector((state: RootState) => state.auctions.auctions);
  const loading = useSelector((state: RootState) => state.auctions.loading);

  const loadAuctions = useCallback(async () => {
    try {
      const data = await fetchAuctions();
      if (data && Array.isArray(data)) {
        dispatch(setAuctions(data));
      } else {
        console.warn("⚠️ La API no devolvió un array válido de subastas.");
      }
    } catch (error) {
      console.error("Error al cargar subastas:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadAuctions();
  }, [loadAuctions]);

  console.log("✅ HomeScreen se está renderizando");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔥 Pujalibre - Subastas en Vivo 🔥</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={auctions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.auctionItem}
              onPress={() => router.push(`/auction/${item.id}`)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Precio Base: ${item.startingPrice}</Text>
              <Text style={styles.timeLeft}>Tiempo restante: {item.timeLeft}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay subastas disponibles</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  auctionItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" } // Web usa boxShadow
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3, // Solo para Android
        }),
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#007AFF",
  },
  timeLeft: {
    fontSize: 14,
    color: "red",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "gray",
  },
});

export default HomeScreen;
