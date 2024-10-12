import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quizzes/history/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });
        setHistory(response.data);
      } catch (error) {
        setError('Failed to fetch quiz history');
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:8000/api/quizzes/history/delete/${quizId}/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setHistory(history.filter(quiz => quiz.id !== quizId));
    } catch (error) {
      setError('Failed to delete quiz');
    }
  };

  const handleReplay = (quizData) => {
    navigate('/upload', { state: { quizData } });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Quiz History</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {history.map((quiz) => (
          <div key={quiz.id} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
            <p className="mb-2">Date Taken: {new Date(quiz.date_taken).toLocaleString()}</p>
            <button onClick={() => handleReplay(quiz.quiz_data)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Replay Quiz</button>
            <button onClick={() => handleDelete(quiz.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistory;
