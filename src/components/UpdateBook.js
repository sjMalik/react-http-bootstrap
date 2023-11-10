import React, { useEffect, useState } from 'react'
import { getAuthors } from '../services/author';
import { createBook, getBook, updateBook } from '../services/book';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function UpdateBook() {
    const { id } = useParams();
    const initialBookState = {
        title: "",
        author: null,
        description: "",
        publishDate: "",
        pageCount: 0,
        cover: null
    };

    const [book, setBook] = useState(initialBookState);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data?.authors)
        })
    }, []);

    useEffect(() => {
        getBook(id).then(data => {
            data.book.publishDate = format(new Date(data.book.publishDate), 'yyyy-MM-dd')
            setBook(data?.book)
        })
    }, [id])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updateBook(book, id).then(res => {
            navigate(`/books/${id}`)
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5>New Book</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            name="title"
                            onChange={handleInputChange}
                            value={book.title}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Author</label>
                        <select
                            className="form-control"
                            id="author"
                            name="author"
                            onChange={handleInputChange}
                            value={book?.author?._id}
                        >
                            <option value="">-- Select One --</option>
                            {authors.map((option) => (
                                <option key={option._id} value={option._id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Publish Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="publishDate"
                            required
                            name="publishDate"
                            onChange={handleInputChange}
                            value={book.publishDate}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Page Count</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pageCount"
                            required
                            name="pageCount"
                            onChange={handleInputChange}
                            value={book.pageCount}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className='form-control'
                            rows={4} // Specify the number of visible rows
                            cols={40} // Specify the number of visible columns
                            onChange={handleInputChange}
                            value={book.description}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary m-2">Reset</button>
                </form>
            </div>
        </div>
    )
}
