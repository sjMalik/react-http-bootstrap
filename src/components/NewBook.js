import React, { useEffect, useState } from 'react'
import { getAuthors } from '../services/author';
import { createBook } from '../services/book';
import { useNavigate } from 'react-router-dom';

export default function NewBook() {
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

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setBook({ ...book, cover: selectedFile })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        createBook(book).then(res => {
            navigate('/books')
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Author</label>
                        <select
                            className="form-control"
                            id="author"
                            name="author"
                            onChange={handleInputChange}
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fileInput" className="form-label">Choose a File:</label>
                        <input
                            type="file"
                            className="form-control" // Apply Bootstrap class for styling
                            id="fileInput"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary m-2">Reset</button>
                </form>
            </div>
        </div>
    )
}
