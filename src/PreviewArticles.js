import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Card } from 'react-bootstrap';

const PreviewArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/article/100/0/');  
        setArticles(response.data.filter(article => article.status === 'publish'));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>Published Articles</h1>
      {currentArticles.map(article => (
        <Card key={article.id} className="mb-3">
          <Card.Header>{article.title}</Card.Header>
          <Card.Body>
            <Card.Title>{article.category}</Card.Title>
            <Card.Text>
              {article.content}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Pagination>
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PreviewArticles;
