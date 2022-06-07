
import { FC } from "react";
import SigininModal from "../SigninModal/SigninModal";
import useSigninModal from "../hooks/useModal";


const SigninModalHOC: FC = ({ children }) => {

    const { showModal, toggleModal } = useSigninModal();

    return (
        <>

            
             <SigininModal
                    showModal={showModal}
                    hide={toggleModal}
                    
            >
            {children}
            </SigininModal>
            

        </>
    )

}

export default SigninModalHOC


