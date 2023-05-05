import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./Interview.css"
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import SpeechToText from "../../components/SpeechToText/SpeechToText"
import TextToSpeech from '../../components/TextToSpeech/TextToSpeech';

const Interview = () => {
    const {id} = useParams()
    const [details, setDetails] = useState({})
    const [botTalking,setBotTalking] = useState(false)
    const [question,setQuestion] = useState("")
    const [isLast,setIsLast] = useState(false)
    let index=0
    useEffect(()=>{
        document.title="Interview"
      })
        axios.get(`http://localhost:5000/interview/${id}`)
      .then(response => {
        setDetails(response.data)
        
    },[])
  return (
    <div className='interview-bot-container'>
      <div className='interview-details'>
        <h4><span>Company: </span> {details.company}</h4>
        <h4><span>Role: </span> {details.role}</h4>
      </div>
      <div className='bot-container'>
        <div className='question-container'>
          <h1>Question ?</h1>
          <TextToSpeech setBotTalking={setBotTalking} question={question}/>
        </div>
        {
          botTalking?<div className='bot-active'><SmartToyTwoToneIcon sx={{ fontSize: 300 }}/></div>:<div className='bot'><SmartToyTwoToneIcon sx={{ fontSize: 300 }}/></div>
        }
        
        <div className='speech-to-text'>

      <SpeechToText />
        </div>
      </div>
      <div className='finish'>
      <button className="styled-button">{isLast?"Finish":"Next"}</button>

      </div>
      
      
    </div>
  )
}

export default Interview
