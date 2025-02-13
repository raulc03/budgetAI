import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "@/src/screens/homeScreen";
import LoginScreen from "@/src/screens/loginScreen";
import { useEffect, useState } from "react";
import { supabase } from "@/src/api/supabase";
import { Session } from "@supabase/supabase-js";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {session && session.user ?
        <HomeScreen key={session.user.id} session={session} /> :
        <LoginScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 10,
  },
})
