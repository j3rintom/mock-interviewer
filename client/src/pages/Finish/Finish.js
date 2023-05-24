import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './Finish.css';
import { UserAuth } from '../../context/AuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Finish = () => {
  const { user } = UserAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const feedback = queryParams.get('feedback');
  const score = queryParams.get('score');

  const [intDetails, setIntDetails] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [isIntDetailsSet, setIsIntDetailsSet] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/interview/${id}`);
        setIntDetails(response.data);
        setIsIntDetailsSet(true);
      } catch (error) {
        console.error('Error fetching interview data:', error);
      }
    };
    
    fetchInterviewData();
  }, [id]);

  useEffect(() => {
    if (user && isIntDetailsSet && !isUserFetched) {
      const uintData = {
        uid: user.uid,
        company: intDetails.company,
        role: intDetails.role,
        type: intDetails.type,
        score: score,
        feedback: feedback,
      };

      const sendUserInterviewData = async () => {
        try {
          await axios.post(`http://localhost:5000/userInterview`, uintData);
          setIntDetails((prevState) => ({
            ...prevState,
            sent: true,
          }));
        } catch (error) {
          console.error('Error sending user interview data:', error);
        }
      };

      sendUserInterviewData();
      setIsUserFetched(true);
      const updateScore = async () =>{
        try {
          await axios.patch(`http://localhost:5000/user/score/${user.uid}`,score)
        } catch (error) {
          console.log(error);
        }
      }
      updateScore()
    }
  }, [user, intDetails, score, feedback, isIntDetailsSet, isUserFetched]);

  useEffect(() => {
    document.title = 'Summary';
  }, []);

  return (
    <div className="finish-container">
      <div className="success-container">
        <h2>Good Job!! The interview was completed successfully!</h2>
        <CheckCircleIcon sx={{ fontSize: 100 }} />
      </div>
      <div className="int-evaluation">
        <h1>Evaluation</h1>
        <div className="score">
          <h3>
            Score Obtained: <span style={{ color: 'white' }}>{score}</span>
          </h3>
        </div>
        <div className="feedback">
          <h2>Feedback</h2>
          <p>{feedback}</p>
        </div>
      </div>
      <div className="go-back">
        <Link className="home-button" to="/home">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Finish;
