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

    console.log('Author', id)

    useEffect(() => {
        getAuthor(id).then(data => {
            setAuthor(data?.author);
        })
    }, [id])

    return (
        <div>
            <h2 className="page-header">{author.name}</h2>
            <div className="btn-row">
                <Link to={`/authors/${id}`}>
                    Edit
                </Link>
            </div>
        </div>
    )
}
