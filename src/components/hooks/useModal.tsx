

import { useContext } from "react";
import SigninModalContext from "../useSigninModal/SigninModalProvider";

const useSigninModal = () => {
    // const { showModal } = useContext(SigninModalContext);
    return useContext(SigninModalContext);
}

export default useSigninModal;


