import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "@/src/screens/loginScreen";
import { useEffect, useState } from "react";
import { supabase } from "@/src/api/supabase";
import { Session } from "@supabase/supabase-js";
import { HomeContextProvider } from "@/src/context/HomeContextProvider";
import HomeScreen from "@/src/screens/homeScreen";

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
        <HomeContextProvider session={session}>
          <HomeScreen key={session.user.id} session={session} />
        </HomeContextProvider> :
        <LoginScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
})
