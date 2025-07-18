import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UrlStats = () => {
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stats')
      .then(res => setUrlData(res.data))
      .catch(() => alert('Failed to fetch stats'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2 style={{ textDecoration: 'underline', marginBottom: '20px' }}>Recent Shortened URLs</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {urlData.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '20px' }}>
            <div><strong>Original:</strong> {item.longUrl}</div>
            <div>
              <strong>Short:</strong>{' '}
              <a href={item.shortUrl} target="_blank" rel="noreferrer">{item.shortUrl}</a>
            </div>
            <div><strong>Expiry:</strong> {new Date(item.expiry).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlStats;
