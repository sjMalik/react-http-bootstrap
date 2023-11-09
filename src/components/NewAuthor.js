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
            navigate('/authors')
        })
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5>New Author</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input value={author.name} onChange={handleInputChange} type="text" className="form-control" id="name" name="name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="reset" className="btn btn-secondary m-2">Reset</button>
                </form>
            </div>
        </div>
    )
}
