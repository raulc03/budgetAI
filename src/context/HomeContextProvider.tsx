import { ReactNode } from "react"
import { UserProvider } from "./UserContext";
import { LoadingProvider } from "./LoadingContext";
import { ModalProvider } from "./ModalContext";
import { Session } from "@supabase/supabase-js";
import { UserCategoryProvider } from "./UserCategoryContext";

type Props = {
    children: ReactNode;
    session: Session;
}

export const HomeContextProvider = ({ session, children }: Props) => {
    return (
        <UserProvider session={session}>
            <UserCategoryProvider>
                <LoadingProvider >
                    <ModalProvider >
                        {children}
                    </ModalProvider>
                </LoadingProvider>
            </UserCategoryProvider>
        </UserProvider>
    );
};
