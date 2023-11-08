import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { updateAuthor, getAuthor } from '../services/author';

export default function UpdateAuthor() {
    const initialUserState = {
        name: ""
    };

    const { id } = useParams()
    const [author, setAuthor] = useState(initialUserState);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthor(id).then(data => {
            setAuthor(data?.author);
        })
    }, [id])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAuthor({ ...author, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAuthor(id, author).then(res => {
            navigate(`/authors/${id}`)
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
