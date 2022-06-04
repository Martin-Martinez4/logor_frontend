
import React from "react";
import Signin from "../Siginin/Signin";

import "./modal.css";

const  SigininModal = ({ showModal, hide, children }) => {

  return (
    

      <React.Fragment>
        { children }
      {showModal
      ?
      <>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button button red" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Signin reDirect={false} />
         
            
        </div>
      </div>
      </>
    : ""
    }
    </React.Fragment>
      )
}


export default SigininModal

