import React, { useState, useEffect } from 'react';
import api from './services/api';

const Books = ({
  isLoggedIn,
}) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const cb = async () => {
      const response = await api.get('/api/books');
      if (response.status === 200) {
        setBooks(response.data);
      }
    };

    if (isLoggedIn) {
      cb();
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <ul>
          {books.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <div>
          Please login to read books.
        </div>
      )}
    </>
  );
};

export default Books;