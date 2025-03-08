import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Importa las pantallas
import HomeScreen from "../../screens/HomeScreen";
import AuctionDetailScreen from "../../screens/AuctionDetailScreen";
import ChatScreen from "../../screens/ChatScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import UserProfileScreen from "../../screens/UserProfileScreen";
import SubscriptionScreen from "../../screens/SubscriptionScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AuctionDetail" component={AuctionDetailScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
