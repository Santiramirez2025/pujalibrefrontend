import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { fetchUserProfile } from "@utils/api";
const UserProfileScreen = () => {
  const userToken = useSelector((state) => state.user.token);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (userToken) {
        const profile = await fetchUserProfile(userToken);
        setUserData(profile);
      }
    };
    loadUserProfile();
  }, [userToken]);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Perfil de Usuario</Text>
          <Text style={styles.info}>Nombre: {userData.name}</Text>
          <Text style={styles.info}>Email: {userData.email}</Text>
          <Text style={styles.info}>Suscripción: {userData.subscription || "Gratis"}</Text>
        </>
      ) : (
        <Text style={styles.info}>Cargando...</Text>
      )}
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
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default UserProfileScreen;
