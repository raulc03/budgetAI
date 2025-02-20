import { createContext, ReactNode, useContext, useState } from "react";
import { userCategoryResponse } from "../types/category";

interface UserCategoryContextType {
    userCategoryList: userCategoryResponse[];
    setUserCategoryList: (value: userCategoryResponse[]) => void;
}

type UserCategoryContextProps = {
    children: ReactNode
};

const UserCategoryContext = createContext<UserCategoryContextType | undefined>(undefined);

export const useUserCategory = () => {
    const context = useContext(UserCategoryContext);
    if (context) {
        return context;
    } else {
        throw new Error('Usar el UserCategory dentro del UserCategoryProvider');
    }
}

export const UserCategoryProvider = ({ children }: UserCategoryContextProps) => {
    const [userCategoryList, setUserCategoryList] = useState<userCategoryResponse[]>([]);
    return (
        <UserCategoryContext.Provider value={{ userCategoryList, setUserCategoryList }} >
            {children}
        </UserCategoryContext.Provider>
    )
}
