import { Tabs } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111111',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color="#fff" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
