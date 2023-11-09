import React, { useState, useEffect } from 'react'
import { getAuthor } from '../services/author';
import { Link, useParams } from 'react-router-dom';

export default function Author(props) {
    const { id } = useParams()
    const [author, setAuthor] = useState({
        author: {
            name: null
        }
    });

    useEffect(() => {
        getAuthor(id).then(data => {
            setAuthor(data?.author);
        })
    }, [id])

    return (
        <div>
            <h2 className="page-header">{author.name}</h2>
            <div className="btn-row mt-2">
                <Link className='btn btn-secondary' to={`/authors/${id}/edit`}>
                    Edit
                </Link>
                {/* <Link className='btn m-2 btn-danger' to={`/authors/${id}`}>
                    Delete
                </Link> */}
            </div>
        </div>
    )
}
