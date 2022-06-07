
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";


interface SigninModalContext {
    showModal?: boolean; 
    toggleModal?: () => void;
    hideModal?:  () => void;
}

const SigninModalContext = createContext<SigninModalContext>({});

export const SigninModalProvider: FC = ({ children }) => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {

        setShowModal(!showModal);

    }

    const hideModal = () => {

        setShowModal(false)
    }



    return (
        <SigninModalContext.Provider value={{ showModal, toggleModal, hideModal }}>
            {children}
        </SigninModalContext.Provider>
    )
}

export default SigninModalContext;