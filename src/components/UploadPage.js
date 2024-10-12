import React, { useState } from 'react';
import axios from 'axios';
import './UploadPage.css';  // Ensure you have the appropriate styles in UploadPage.css

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [quizType, setQuizType] = useState('true/false');
  const [questions, setQuestions] = useState([]);  // State to store parsed questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // State to track current question index
  const [score, setScore] = useState(0);  // State to track the user's score
  const [quizOver, setQuizOver] = useState(false);  // State to check if the quiz is over
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');  // State to track selected answer
  const [numQuestions, setNumQuestions] = useState(3);  // State to track the number of questions user wants

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quiz_type', quizType);
    formData.append('num_questions', numQuestions);  // Add number of questions to the form data
    formData.append('user_id', localStorage.getItem('user_id')); // Add user_id

    try {
      const response = await axios.post('http://localhost:8000/api/quizzes/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      const quizContent = response.data.content;
      console.log('Quiz Content:', quizContent);  // Log the quiz content

      const parsedQuestions = parseQuestions(quizContent);
      if (Array.isArray(parsedQuestions)) {
        setQuestions(parsedQuestions.slice(0, numQuestions));
        setError(null);
      } else {
        console.error('Parsed content is not an array:', parsedQuestions);
        setError('Unexpected API response format');
      }
    } catch (error) {
      console.error('File upload failed:', error.response ? error.response.data : error.message);
      setError('File upload failed');
    }
  };

  const parseQuestions = (content) => {
    try {
      const parsedContent = JSON.parse(content);
      console.log('Parsed Questions:', parsedContent);  // Log the parsed questions

      if (Array.isArray(parsedContent)) {
        return parsedContent.map(question => {
          if (quizType === 'multiple choice') {
            return {
              question: question.question,
              options: question.options || [],  // Ensure options is always an array
              correct: question.answer || question.correct_answer
            };
          } else {
            return {
              question: question.question,
              correct: question.answer 
            };
          }
        });
      } else if (parsedContent.questions) {
        // Handle case where questions are nested under a key
        return parsedContent.questions.map(question => {
          if (quizType === 'multiple choice') {
            return {
              question: question.question,
              options: question.options || [],  // Ensure options is always an array
              correct: question.answer || question.correct_answer
            };
          } else {
            return {
              question: question.question,
              correct: question.answer
            };
          }
        });
      } else {
        console.error('Unexpected JSON structure:', parsedContent);
        setError('Unexpected JSON structure');
        return [];
      }
    } catch (error) {
      console.error('Failed to parse JSON content:', error);
      setError('Failed to parse JSON content');
      return [];
    }
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', currentQuestion.correct);

    if (typeof currentQuestion.correct === 'string') {
      if (selectedAnswer.toLowerCase() === currentQuestion.correct.toLowerCase()) {
        console.log('Answer is correct, incrementing score');
        setScore(prevScore => prevScore + 1);
      }
    } else if (typeof currentQuestion.correct === 'boolean') {
      if (selectedAnswer.toLowerCase() === currentQuestion.correct.toString().toLowerCase()) {
        console.log('Answer is correct, incrementing score');
        setScore(prevScore => prevScore + 1);
      }
    }

    setSelectedAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer('');
    }
  };

  const handleEndQuiz = () => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', currentQuestion.correct);

    if (typeof currentQuestion.correct === 'string') {
      if (selectedAnswer.toLowerCase() === currentQuestion.correct.toLowerCase()) {
        console.log('Answer is correct, incrementing score');
        setScore(prevScore => prevScore + 1);
      }
    } else if (typeof currentQuestion.correct === 'boolean') {
      if (selectedAnswer.toLowerCase() === currentQuestion.correct.toString().toLowerCase()) {
        console.log('Answer is correct, incrementing score');
        setScore(prevScore => prevScore + 1);
      }
    }

    setQuizOver(true);
  };

  const handleReload = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizOver(false);
    setSelectedAnswer('');
    setError(null);
  };

  const currentQuestion = questions[currentQuestionIndex] || {};
  const remainingQuestions = questions.length - currentQuestionIndex - 1;

  return (
    <div className="container">
      <h2>Upload Notes</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <select value={quizType} onChange={(e) => setQuizType(e.target.value)} className="quiz-select">
          <option value="true/false">True/False</option>
          <option value="multiple choice">Multiple Choice</option>
        </select>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          min="1"
          max="50"
          className="num-questions-input"
          placeholder="Number of Questions"
        />
        <button type="submit" className="upload-button">Upload</button>
        <button type="button" onClick={handleReload} className="upload-button">Reload</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {questions.length > 0 && !quizOver && (
        <div className="quiz-container">
          <h2>{currentQuestion.question}</h2>
          <form>
            {quizType === 'multiple choice' ? (
              currentQuestion.options.map((option, index) => (
                <div key={index} className="option-box">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))
            ) : (
              <>
                <div className="option-box">
                  <input
                    type="radio"
                    id="option-true"
                    name="answer"
                    value="True"
                    checked={selectedAnswer === 'True'}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor="option-true">True</label>
                </div>
                <div className="option-box">
                  <input
                    type="radio"
                    id="option-false"
                    name="answer"
                    value="False"
                    checked={selectedAnswer === 'False'}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor="option-false">False</label>
                </div>
              </>
            )}
          </form>
          <div className="button-container">
            <button type="button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="nav-button">
              Previous Question
            </button>
            {remainingQuestions > 0 ? (
              <button type="button" onClick={handleNextQuestion} className="nav-button">
                Next Question
              </button>
            ) : (
              <button type="button" onClick={handleEndQuiz} className="nav-button">
                End Quiz
              </button>
            )}
          </div>
          <p>{remainingQuestions} questions remaining</p>
        </div>
      )}
      {quizOver && (
        <div className="results-container">
          <h2>Quiz Over</h2>
          <p>Score: {score}</p>
          <p>Total Questions: {questions.length}</p>
          <p>Questions Missed: {questions.length - score}</p>
          <h3>Review Your Answers</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                <p>Question: {q.question}</p>
                <p>Correct Answer: {q.correct}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
