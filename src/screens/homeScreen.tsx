import BalanceHeader from "../components/balanceHeader";
import DetailView from "../components/detailView";
import AddButton from "../components/addButon";
import { StyleSheet, View } from "react-native";
import Loading from "../components/loading";
import ModalBalance from "../components/modal";
import { useUser } from "../context/UserContext";
import { LoadingProvider, useLoading } from "../context/LoadingContext";

export default function HomeScreen() {
    const { isLoading } = useLoading();
    const { user } = useUser();

    return !isLoading && user ? (
        <>
            <View style={styles.container}>
                <BalanceHeader />
                <LoadingProvider>
                    <DetailView />
                    <AddButton />
                </LoadingProvider>
            </View >
            <ModalBalance />
        </>
    ) : <Loading />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 15,
    },
})
