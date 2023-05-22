import React, { useEffect, useState } from 'react';
import './SpeechRecognition.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const openaiApiKey = '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';


async function calculateSimilarity(sentence1, sentence2) {
    const prompt = `${sentence1}\n${sentence2}\nSimilarity score:`;
    const maxTokens = 128;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt,
        max_tokens: maxTokens,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
        stop: false,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      });
  
      const choices = response.data.choices;
      if (choices && choices.length > 0) {
        const similarityScore = choices[0].text.trim();
        return parseFloat(similarityScore);
      }
    } catch (error) {
      console.error('OpenAI API request failed:', error);
    }
  
    return null;
  }
  
  




const SpeechRecognition = ({ setBotTalking, botTalking }) => {
    const { id } = useParams();
    const [scores,setScores] = useState([])
    const [score,setScore] = useState(0)
    const [index, setIndex] = useState(0);
    const [isLast, setIsLast] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(0); // Start the timer at 0 initially
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Track if the timer is running
    const [answer, setAnswer] = useState(''); // Store the user's voice input
    const [recognition, setRecognition] = useState(null); // Store the SpeechRecognition object
    const [question, setQuestion] = useState(''); // Store the current question as subtitle

    async function checkSimilarity(answer1, answer2) {
        const similarityScore = await calculateSimilarity(answer1, answer2);
        return similarityScore;
      }

    useEffect(() => {
        axios.get(`http://localhost:5000/interview/${id}`)
            .then((response) => {
                setQuestions(response.data.questions);
                setLoading(false);
                speak(response.data.questions[index].question); // Start speaking the first question immediately
            })
            .catch((error) => {
                console.error('Error fetching interview data:', error);
            });
    }, []);

    const speak = (text) => {
        setBotTalking(true);
        setQuestion(text); // Set the current question as the subtitle
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
                handleNextClick()
            }

            return () => clearInterval(interval);
        }
    }, [isTimerRunning, timer]);

    const startTimer = () => {
        setTimer(90); // Set the initial timer value
        setIsTimerRunning(true); // Start the timer
    };

    const startRecording = () => {
        let i=0;
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true; // Allow continuous voice recognition
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onresult = (event) => {
            console.log(event);
            const result = event.results[i][0].transcript;
            setAnswer((prevResult)=>prevResult+result);
            i=i+1;
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

    const handleNextClick = async () => {
        stopRecording();
        const similarityScore = await checkSimilarity(questions[index].answer, answer);
        setScores((prevScores) => [...prevScores, similarityScore]);
        setAnswer('');
        setIndex((prevIndex) => prevIndex + 1);
        if (index + 1 === questions.length - 1) {
          setIsLast(true);
        }
        console.log(scores);
        speak(questions[index + 1].question);
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
                        <button onClick={handleNextClick} className="styled-button">
                            {isLast ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SpeechRecognition;
