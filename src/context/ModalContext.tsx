import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextType = {
    isModal: boolean;
    setIsModal: (isModal: boolean) => void;
}

type Props = {
    children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context)
        throw new Error('useModal debe usarse dentro de ModalProvider');
    return context;
}

export const ModalProvider = ({ children }: Props) => {
    const [isModal, setIsModal] = useState<boolean>(false);
    return (
        <ModalContext.Provider value={{ isModal, setIsModal }}>
            {children}
        </ModalContext.Provider>
    );
};
