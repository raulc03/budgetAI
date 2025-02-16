import { createContext, ReactNode, useContext, useState } from "react";

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

type Props = {
    children: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if (!context)
        throw new Error('useLoading debe usarse dentro de LoadingProvider');

    return context;
}

export const LoadingProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
