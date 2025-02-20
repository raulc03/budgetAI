import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import User from "../types/user";
import { userCategoryResponse } from "../types/category";
import { getUser } from "../api/userService";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../api/supabase";

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
}

type Props = {
    session: Session;
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe usarse dentro del UserProvider');
    }
    return context;
}

export const UserProvider = ({ session, children }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser(session, setUser);

        //NOTE: Usado para actualizar el user cuando se registre un gasto o ingreso y,
        //NOTE: por lo tanto, se actualice el balance del usuario.
        const subscription = supabase
            .channel('user-changes')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users' }, (payload) => {
                const updatedUser = payload.new as User;
                if (updatedUser.user_id) {
                    setUser(updatedUser);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [session]);

    return (
        <UserContext.Provider value={{
            user, setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
