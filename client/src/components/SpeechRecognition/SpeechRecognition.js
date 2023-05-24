import React, { useEffect, useState } from 'react';
import './SpeechRecognition.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const SpeechRecognition = ({ setBotTalking, botTalking }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answer, setAnswer] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [question, setQuestion] = useState('');
  const [scoreload, setScoreload] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/interview/${id}`)
      .then((response) => {
        setQuestions(response.data.questions);
        setLoading(false);
        speak(response.data.questions[index].question);
      })
      .catch((error) => {
        console.error('Error fetching interview data:', error);
      });
  }, []);

  const speak = (text) => {
    setBotTalking(true);
    setQuestion(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => {
      setBotTalking(false);
      startTimer();
      startRecording();
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(interval);
        handleNextClick();
      }

      return () => clearInterval(interval);
    }
  }, [isTimerRunning, timer]);

  const startTimer = () => {
    setTimer(90);
    setIsTimerRunning(true);
  };

  const getScore = async (sentence1, sentence2) => {
    setScoreload(true);
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: `compare the following sentences and give similarity score. Sentence 1 - ${sentence1} Sentence 2 - ${sentence2} . Strictly Return only percentage of similarity as an integer of one, two or three digits and avoid any comments that are words in your answer. if any of the sentence is blank , then return 0`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const score = await response.text();
      const { type } = questions[index];
      const scoreString = `${type}:${score}`;
      setScores((prevScores) => [...prevScores, scoreString]);
    } catch (error) {
      console.log(error);
    } finally {
      setScoreload(false);
      console.log(scores);
      setAnswer('');
      setIndex((prevIndex) => prevIndex + 1);
      if (index === questions.length -2) {
        setIsLast(true);
      }
      if (isLast) {
        getFeedback();
      } else if (questions.length > index + 1) {
        speak(questions[index + 1].question);
      }
    }
  };

  const getFeedback = async () => {
    setScoreload(true);

    const options = {
        method: 'POST',
        body: JSON.stringify({
            message: `${scores} given is a list of scores obtained on different subjects where key is the subject name. give overall feedback of performance. be specific and avoid unnecessary lines. Take average of scores on repeating keys and dont give the calculation of average score.Strictly avoid printing the line 'Based on the given scores in the dictionary, here is the specific and concise overall feedback on the performance in different subjects:'  or you will be punished. Also give overall performance score out of 100 as the last one,two or three integers in the format 'Overall Performance : score'`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const options2 = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await fetch('http://localhost:8000/completions', options);
        const feedback = await response.text();
        
        const regex = /Overall Performance: (\d+)/;
        const match = feedback.match(regex);
        let score=0
        if (match && match[1]) {
        score = parseInt(match[1]);
        console.log(score); // The overall performance score will be printed here
        } else {
        console.log("Unable to extract the overall performance score.");
        }

        await fetch(`http://localhost:5000/interview/${id}`,options2)
        console.log(feedback);
        
        navigate(`/interview/${id}/finish?feedback=${encodeURIComponent(feedback)}&score=${score}`);
    } catch (error) {
        console.log(error);
    } finally {
        setScoreload(false);
      }
      
      
  };

  const startRecording = () => {
    let i = 0;
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event) => {
      console.log(event);
      const result = event.results[i][0].transcript;
      setAnswer((prevResult) => prevResult + result);
      i = i + 1;
    };
    recognition.start();
    setRecognition(recognition);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  const handleNextClick = () => {
    stopRecording();
    if (questions.length > 0 && index < questions.length) {
      getScore(answer, questions[index].answer);
    }
  };

  return (
    <div className="speech-recognition">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="timer-container">
            <div className="timer">
              <h3>{timer}</h3>
            </div>
          </div>
          <div className="bot-container">
            <div className="question-container">
              <h1>Question ?</h1>
              <h4>{question}</h4>
            </div>
            {botTalking ? (
              <div className="bot-active">
                <SmartToyTwoToneIcon sx={{ fontSize: 300 }} />
              </div>
            ) : (
              <div className="bot">
                <SmartToyTwoToneIcon sx={{ fontSize: 300 }} />
              </div>
            )}
            <div className="speech-to-text">
              <p className="subtitle">{answer}</p>
            </div>
          </div>
          <div className="finish">
            <button onClick={handleNextClick} className="styled-button" disabled={scoreload}>
              {scoreload ? 'Loading..' : isLast ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SpeechRecognition;
