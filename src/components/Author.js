import React, { useState, useEffect } from 'react'
import { deleteAuthor, getAuthor } from '../services/author';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from './common/Modal';

export default function Author(props) {
    const { id } = useParams()
    const [author, setAuthor] = useState({
        author: {
            name: null
        }
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const openModal = (id, index) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        getAuthor(id).then(data => {
            setAuthor(data?.author);
            setBooks(data?.books)
        })
    }, [id]);

    const removeAuthor = () => {
        closeModal();
        deleteAuthor(selectedId)
            .then(data => {
                navigate('/authors')
            })
    }

    const viewBook = (id) => {
        navigate(`/books/${id}`)
    }

    return (
        <div>
            <Modal isOpen={showModal} onClose={closeModal} action={removeAuthor}>
                <p>Are you sure to want remove the Author?</p>
            </Modal>
            <h2 className="page-header">{author.name}</h2>
            <div className="btn-row mt-2">
                <Link className='btn btn-secondary' to={`/authors/${id}/edit`}>
                    Edit
                </Link>
                <button className='btn btn-danger m-2' onClick={() => openModal(author._id)}>
                    Delete
                </button>
            </div>

            <h4 className='page-subheader mt-3 mb-3'>Book Gallery</h4>
            <div className="row">
                {books.map((book, index) => (
                    <div key={index} className="col-md-3 mb-3">
                        <img
                            src={`data:image/jpeg;base64,${book.coverImageFile}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => viewBook(book._id)}
                            height="300"
                            width="250"
                            alt="" />
                        <p className='mt-1 book-name'>{book.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
