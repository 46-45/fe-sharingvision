import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllPost from './AllPost';
import AddArticle from './AddArticle';
import PreviewArticles from './PreviewArticles';
import './App.css'; 
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">My Blog</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/add-new">Add New Article</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/preview">Preview Published Articles</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/add-new" element={<AddArticle />} />
            <Route path="/preview" element={<PreviewArticles />} />
            <Route path="/" element={<AllPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
