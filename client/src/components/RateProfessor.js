import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const RateProfessor = () => {
  const [professorName, setProfessorName] = useState('');
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`/api/professors/${professorName}`);
      setRatings(response.data.ratings || []);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const submitRating = async () => {
    try {
      await axios.post('/api/professors', { name: professorName, rating, feedback });
      fetchRatings(); // Refresh ratings after submitting
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Rate a Professor</Typography>
      <TextField
        label="Professor Name"
        value={professorName}
        onChange={(e) => setProfessorName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        type="number"
        fullWidth
      />
      <TextField
        label="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <Button onClick={submitRating} variant="contained">Submit Rating</Button>
      
      <Typography variant="h6">Existing Ratings:</Typography>
      {ratings.map((r, index) => (
        <div key={index}>
          <Typography>Rating: {r.rating}</Typography>
          <Typography>Feedback: {r.feedback}</Typography>
        </div>
      ))}
    </div>
  );
};

export default RateProfessor;
