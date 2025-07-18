import React, { useState } from 'react';
import axios from 'axios';

const UrlShortner = () => {
  const [urlInputs, setUrlInputs] = useState(['']);
  const [shortUrls, setShortUrls] = useState([]);

  const handleChange = (index, value) => {
    const newInputs = [...urlInputs];
    newInputs[index] = value;
    setUrlInputs(newInputs);
  };

  const handleAddField = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([...urlInputs, '']);
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    const requests = urlInputs
      .filter(url => url.trim() !== '')
      .map(url => axios.post('http://localhost:5000/api/shorten', { longUrl: url }));

    try {
      const responses = await Promise.all(requests);
      setShortUrls(responses.map(res => res.data.shortUrl));
    } catch (err) {
      alert('Error shortening one or more URLs');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#000000ff',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        URL Shortener (Up to 5 URLs)
      </h2>

      <form onSubmit={handleShorten} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '80%', maxWidth: '500px' }}>
        {urlInputs.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Paste URL #${index + 1}`}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        ))}
        {urlInputs.length < 5 && (
          <button type="button" onClick={handleAddField} style={{
            backgroundColor: '#f0f0f0',
            padding: '8px',
            border: '1px solid #aaa',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            + Add Another URL
          </button>
        )}
        <button type="submit" style={{
          padding: '10px',
          fontSize: '1rem',
          backgroundColor: '#000000ff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Shorten All
        </button>
      </form>

      {shortUrls.length > 0 && (
        <div style={{
          marginTop: '20px',
          fontSize: '1rem',
          backgroundColor: '#e0f2fe',
          padding: '10px',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <p><strong>Shortened URLs:</strong></p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {shortUrls.map((url, i) => (
              <li key={i}><a href={url} target="_blank" rel="noreferrer">{url}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UrlShortner;
