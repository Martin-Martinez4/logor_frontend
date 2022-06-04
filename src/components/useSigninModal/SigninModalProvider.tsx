
import { createContext, useState } from "react";

const SigninModalContext = createContext(false);

export const SigninModalProvider = ({ children }) => {

    const [showModal, setShowModal] = useState(false);

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