import React, { useState } from 'react'
import { createAuthor } from '../services/author';
import { useNavigate } from 'react-router-dom';

export default function NewAuthor() {
    const initialUserState = {
        name: ""
    };
    const [author, setAuthor] = useState(initialUserState);
    const navigate = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAuthor({ ...author, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        createAuthor(author).then(res => {
            navigate('/')
        })
    }

    return (
        <div className="submit-form">
            <h2>New Author</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="user">Author Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={author.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <button type='submit' className="btn btn-success mt-2">
                    Submit
                </button>
            </form>
        </div>
    )
}
