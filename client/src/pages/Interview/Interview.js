import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./Interview.css"
import SpeechRecognition from '../../components/SpeechRecognition/SpeechRecognition'
// import SpeechToText from "../../components/SpeechToText/SpeechToText"
// import TextToSpeech from '../../components/TextToSpeech/TextToSpeech';

const Interview = () => {
    const {id} = useParams()
    const [details, setDetails] = useState({})
    const [botTalking,setBotTalking] = useState(false)
    
    useEffect(()=>{
        document.title="Interview"
        axios.get(`http://localhost:5000/interview/${id}`)
      .then(response => {
        setDetails(response.data)
        
    })},[])
    
  return (
    <div className='interview-bot-container'>
      <div className='interview-details'>
        <h4><span>Company: </span> {details.company}</h4>
        <h4><span>Role: </span> {details.role}</h4> 
      </div>
      <SpeechRecognition setBotTalking={setBotTalking} botTalking={botTalking}/>
      
    </div>
  )
}

export default Interview
