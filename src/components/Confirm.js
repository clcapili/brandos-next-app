import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'bootstrap'

const confirmContainer = document.getElementById('confirm-root');

const Confirm = ({
    className,
    title,
    body,
    children,
    onSubmit,
    ...props
  }) => {
    
    const [isShow, setShow] = useState(false);
   
    const toggleShow = () => {
        setShow(!isShow);
    };

    return (
        <a onClick={toggleShow} className={className} {...props}>
            {children}
            {isShow && ReactDOM.createPortal(<ConfirmModal title={title} body={body} onSubmit={onSubmit} />, confirmContainer)}
        </a>
    )
}


const ConfirmModal = ({
    id,
    title,
    body,
    onSubmit,
    ...props
  }) => {
    
    const modalRef = useRef()  

    let modal;

    useEffect(() => {
        modal = new Modal(modalRef.current, {});
        modal.show();
    })

    const handleSubmit = () => {
        onSubmit();
        modal.hide();
    };
    
    return (
        <div className="modal" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">CANCEL</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>CONFIRM</button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Confirm;