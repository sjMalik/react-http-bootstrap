import React, { useEffect, useState } from 'react'
import { deleteBook, getBook } from '../services/book';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Modal from './common/Modal';

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState({
        book: {
            title: null,
            coverImageFile: null,
            publishDate: ''
        }
    });
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
        getBook(id)
            .then(data => {
                data.book.publishDate = format(new Date(data.book.publishDate), 'MMMM d, yyyy')
                setBook(data.book)
            })
    }, [id]);

    const removeBook = () => {
        closeModal();
        deleteBook(selectedId)
            .then(data => {
                navigate('/books')
            })
    }

    return (
        <div>
            <Modal isOpen={showModal} onClose={closeModal} action={removeBook}>
                <p>Are you sure to want remove the Book?</p>
            </Modal>

            <h2 className="page-header mb-4">{book.title}</h2>
            <img src={`data:image/jpeg;base64,${book.coverImageFile}`} height="300" width="250" alt=""></img>
            <div className='mt-4'>
                <p>Author: {book?.author?.name}</p>
                <p>Published On: {book.publishDate}</p>
                <p>Page Count: {book.pageCount}</p>
                <p>Description: {book.description}</p>
            </div>
            <Link className='btn btn-secondary' to={`/books/${id}/edit`}>
                Edit
            </Link>
            <button className='btn btn-danger m-2' onClick={() => openModal(book._id)}>Delete</button>
        </div>
    )
}
