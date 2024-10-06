import React, { useState } from 'react';

const ProfessorRating = () => {
  const [professorName, setProfessorName] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/api/professor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: professorName, rating }),
    });

    setProfessorName('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rate a Professor</h2>
      <input
        type="text"
        value={professorName}
        onChange={(e) => setProfessorName(e.target.value)}
        placeholder="Professor Name"
        required
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        required
      />
      <button type="submit">Submit Rating</button>
    </form>
  );
};

export default ProfessorRating;
