import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tabs, Tab, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const AllPost = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [key, setKey] = useState('published');
  
    useEffect(() => {
      fetchArticles();
    }, []);
  
    const fetchArticles = async () => {
      const response = await axios.get("http://127.0.0.1:8000/article/100/0/");
      setArticles(response.data);
    };
  
    const handleEdit = (article) => {
      setSelectedArticle(article);
    };
  
    const handleDelete = (id) => {
        const updatedData = { status: 'thrash' };  
        axios.put(`http://127.0.0.1:8000/article/${id}/`, updatedData)
          .then(response => {
            fetchArticles(); 
          })
          .catch(error => console.error('Error updating article to trash:', error));
      };
      
  
    const handleUpdateArticle = (id, data) => {
      axios.put(`http://127.0.0.1:8000/article/${id}/`, data)
        .then(response => {
          fetchArticles();  
          setSelectedArticle(null); 
        })
        .catch(error => console.error('Error updating article:', error));
    };

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="published" title="Published">
          {selectedArticle ? (
            <EditArticleForm article={selectedArticle} onUpdateArticle={handleUpdateArticle} />
          ) : (
            <ArticleTable articles={articles.filter(article => article.status === 'publish')} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Tab>
        <Tab eventKey="drafts" title="Drafts">
          {selectedArticle ? (
            <EditArticleForm article={selectedArticle} onUpdateArticle={handleUpdateArticle} />
          ) : (
            <ArticleTable articles={articles.filter(article => article.status === 'draft')} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Tab>
        <Tab eventKey="trashed" title="Trashed">
          {selectedArticle ? (
            <EditArticleForm article={selectedArticle} onUpdateArticle={handleUpdateArticle} />
          ) : (
            <ArticleTable articles={articles.filter(article => article.status === 'thrash')} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

const ArticleTable = ({ articles, onEdit, onDelete }) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.category}</td>
            <td>
              <PencilSquare onClick={() => onEdit(article)} style={{ marginRight: 10, cursor: 'pointer' }} />
              <Trash onClick={() => onDelete(article.id)} style={{ cursor: 'pointer' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

const EditArticleForm = ({ article, onUpdateArticle }) => {
    const [title, setTitle] = useState(article.title);
    const [content, setContent] = useState(article.content);
    const [category, setCategory] = useState(article.category);
    const [status, setStatus] = useState(article.status);
  
    const handleSave = () => {
      onUpdateArticle(article.id, { title, content, category, status });
    };
  
    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={e => setContent(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <DropdownButton id="dropdown-basic-button" title={status.charAt(0).toUpperCase() + status.slice(1)}>
            <Dropdown.Item onClick={() => setStatus('publish')}>Publish</Dropdown.Item>
            <Dropdown.Item onClick={() => setStatus('draft')}>Draft</Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    );
  };
export default AllPost;
