import BalanceHeader from "../components/balanceHeader";
import DetailView from "../components/detailView";
import AddButton from "../components/addButon";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";
import pickImage from "../utils/openLibrary";
import { useEffect, useState } from "react";
import User from "../types/user";
import { supabase } from "../api/supabase";
import { Alert } from "react-native";
import Loading from "../components/loading";

type Props = {
    session: Session;
}

export default function HomeScreen({ session }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (session) getUser();
    }, [session])

    const getUser = async () => {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No existe usuario en la sessión!')

            const { data, error, status } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', session?.user.id)
                .single() as PostgrestSingleResponse<User>;

            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setUser(data);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const amount = '1,000';

    return !loading && user ? (
        <>
            <BalanceHeader amount={amount} username={user.name} />
            <DetailView user_id={user.user_id} />
            <AddButton handlyClassify={() => pickImage(user.user_id)} />
        </>
    ) : <Loading />;
};
