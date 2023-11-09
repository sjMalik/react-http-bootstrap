import React, { useEffect, useState } from 'react'
import { getBook } from '../services/book';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState({
        book: {
            title: null,
            coverImageFile: null,
            publishDate: ''
        }
    });

    useEffect(() => {
        getBook(id)
            .then(data => {
                data.book.publishDate = format(new Date(data.book.publishDate), 'MMMM d, yyyy')
                setBook(data.book)
            })
    }, [id])

    return (
        <div>
            <h2 className="page-header mb-4">{book.title}</h2>
            <img src={`data:image/jpeg;base64,${book.coverImageFile}`} height="300" width="250" alt=""></img>
            <div className='mt-4'>
                <p>Author: {book?.author?.name}</p>
                <p>Published On: {book.publishDate}</p>
                <p>Page Count: {book.pageCount}</p>
                <p>Description: {book.description}</p>
            </div>
        </div>
    )
}
