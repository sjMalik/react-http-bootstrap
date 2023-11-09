import React, { useEffect, useState } from 'react'
import { getBooks } from '../services/book';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function Books() {
    const [books, setBooks] = useState([]);
    const naviagte = useNavigate();

    useEffect(() => {
        getBooks().then(data => {
            setBooks(data?.books)
        })
    }, []);

    const viewBook = (bookId) => {
        naviagte(`/books/${bookId}`)
    }

    return (
        <div>
            <h2 className='page-header mb-3'>Book Gallery</h2>
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
