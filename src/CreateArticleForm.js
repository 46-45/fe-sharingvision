import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateArticleForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (eventStatus) => {
        setStatus(eventStatus);
        const articleData = {
            title,
            content,
            category,
            status: eventStatus
        };

        axios.post('http://127.0.0.1:8000/article/', articleData)
            .then(response => {
                console.log('Article created:', response.data);
                // Optionally clear form or give feedback to user
            })
            .catch(error => {
                console.error('Error creating article:', error);
            });
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Article content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" onClick={() => handleSubmit('publish')}>
                Save as Publish
            </Button>
            {' '}
            <Button variant="secondary" onClick={() => handleSubmit('draft')}>
                Save as Draft
            </Button>
        </Form>
    );
};

export default CreateArticleForm;
