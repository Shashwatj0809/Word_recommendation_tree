import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nodes, setNodes] = useState([{ id: 1, label: 'Start' }]);
  const [currentWord, setCurrentWord] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [idCounter, setIdCounter] = useState(2);

  const fetchSuggestions = async (word) => {
    if (!word) return setSuggestions([]);
    try {
      const res = await axios.post('/suggest', { word }); // proxied to Flask
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error('Error fetching suggestions', err);
    }
  };

  const addNode = (label) => {
    const newNode = { id: idCounter, label };
    setNodes([...nodes, newNode]);
    setIdCounter(idCounter + 1);
    setCurrentWord(label);
    setSuggestions([]);
  };

  const handleWordChange = (e) => {
    const w = e.target.value.trim();
    setCurrentWord(w);
    fetchSuggestions(w);
  };

  return (
    <div className="App">
      <h1>🧠 Simple Bigram Mind Map</h1>
      <input
        value={currentWord}
        onChange={handleWordChange}
        placeholder="Type a word..."
      />
      <div className="suggestions">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => addNode(s)}>
            {s}
          </button>
        ))}
      </div>
      <ul className="mindmap">
        {nodes.map((n) => (
          <li key={n.id}>{n.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
