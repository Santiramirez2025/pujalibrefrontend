import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "@store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubscribe = (plan) => {
    dispatch(setUser({ name: "Usuario", email: "usuario@email.com", subscription: plan }));
    navigation.navigate("UserProfile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu plan</Text>
      <Button title="Plan Básico - Gratis" onPress={() => handleSubscribe("Básico")} />
      <Button title="Plan Premium - $10/mes" onPress={() => handleSubscribe("Premium")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SubscriptionScreen;
