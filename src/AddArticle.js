import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (selectedStatus) => {
    const articleData = {
      title,
      content,
      category,
      status: selectedStatus 
    };
    axios.post('http://127.0.0.1:8000/article/', articleData)
      .then(response => {
        setMessage('Success! Article has been posted.');
        setErrorMessages([]); 
        setTimeout(() => {
          navigate('/'); 
        }, 2000); 
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          const errorList = [];
          if (errors.title) {
            errorList.push(`Title: ${errors.title.join(' ')}`);
          }
          if (errors.content) {
            errorList.push(`Content: ${errors.content.join(' ')}`);
          }
          setErrorMessages(errorList);
          setMessage('');
        } else {
          setErrorMessages(['An unexpected error occurred. Please try again.']);
          setMessage('');
        }
      });
  };
  
  return (
    <div>
      <h2>Add New Article</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {errorMessages.length > 0 && (
        <Alert variant="danger">
          {errorMessages.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </Alert>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} value={content} onChange={e => setContent(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={() => handleSubmit('publish')}>
          Publish
        </Button>
        {' '}
        <Button variant="secondary" onClick={() => handleSubmit('draft')}>
          Save as Draft
        </Button>
      </Form>
    </div>
  );
};

export default AddArticle;
