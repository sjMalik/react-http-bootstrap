import React from 'react';

const Modal = ({ isOpen, onClose, action, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Remove Author</h5>
                        <button type="button" className="close btn btn-sm btn-outline-secondary" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={action}>
                            Confirm
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
