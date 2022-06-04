
import SigininModal from "../SigninModal/SigninModal";
import useSigninModal from "../hooks/useModal";


const SigninModalHOC = ({ children }) => {

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


