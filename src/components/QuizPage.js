// src/components/QuizPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/quizzes/${id}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setQuiz(response.data);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Quiz</h2>
      {quiz.content.split('\n').map((question, index) => (
        <div key={index}>{question}</div>
      ))}
    </div>
  );
};

export default QuizPage;
