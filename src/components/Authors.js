import React, { useEffect, useState } from 'react'
import { getAuthors } from '../services/author';
import { Link } from 'react-router-dom';

export default function Authors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        getAuthors().then(data => {
            setAuthors(data?.authors);
        })
    }, [])

    return (
        <div>
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
                                    <Link className='btn btn-danger' to={`/authors/${author._id}`}>
                                        Delete
                                    </Link>
                                </li>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
