import React, { useEffect, useState } from 'react'
import { deleteAuthor, getAuthors } from '../services/author';
import { Link, useNavigate } from 'react-router-dom';

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const openModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data?.authors);
        })
    }, [authors])

    const removeAuthor = () => {
        closeModal();
        deleteAuthor(selectedId)
            .then(data => {
                setAuthors([])
            })
    }

    return (
        <div>
            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Remove Author</h5>
                                <button type="button" className="close btn btn-sm btn-outline-secondary" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Modal content goes here */}
                                <p>Are you sure to want remove the Author?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={removeAuthor}>
                                    Confirm
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-center mb-3">Author List</h2>
            <div className="bs-component">
                {authors.length === 0 ? (
                    <div className="text-center mt-4">No records found</div>
                ) : (
                    <div className="list-group">
                        {authors.map((author) => {
                            return (
                                <li key={author._id} className="list-group-item">
                                    <span className='author-name'>{author.name}</span><br />
                                    <Link className='btn btn-primary' to={`/authors/${author._id}`}>
                                        View
                                    </Link>
                                    <Link className='btn m-2 btn-secondary' to={`/authors/${author._id}/edit`}>
                                        Edit
                                    </Link>
                                    <button className='btn btn-danger' onClick={() => openModal(author._id)}>
                                        Delete
                                    </button>
                                </li>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
