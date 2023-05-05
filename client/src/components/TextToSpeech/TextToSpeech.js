import React,{useState,useEffect} from 'react'
const { SpeechSynthesis } = window.speechSynthesis;

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [words,setWords] = useState("")
    const [transcript,setTranscript] =  useState("")
    const [wordArray,setWordArray] = useState([])
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < wordArray.length) {
            setTranscript(prevTranscript => prevTranscript + wordArray[index] + " ");
            index++;
          } else {
            clearInterval(interval);
          }
        }, 500);
        return () => clearInterval(interval);
        //  clear the words array
      }, [wordArray]);
      useEffect(()=>{
          setWordArray(words.split(" "))
      },[words])
    const speak = () => {
        setTranscript("")
        // let index = 0;
        // setInterval(() => {
        // if (index < wordsArray.length) {
        //     let str =transcript+ wordsArray[index] + " ";
        //     setTranscript(str)
        //     index++;
        // }
        // }, 450);
        setWords(text)
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        console.log(utterance);
        window.speechSynthesis.speak(utterance);
      }
      
      return (
        <div>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={speak}>Speak</button>
          <h2>{transcript}</h2>
        </div>
      );
      
}

export default TextToSpeech
