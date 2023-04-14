import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Interview = () => {
    const {id} = useParams()
    const [details, setDetails] = useState({})
    useEffect(()=>{
        document.title="Interview"
      })
        axios.get(`http://localhost:5000/interview/${id}`)
      .then(response => {
        setDetails(response.data)
        console.log(details);
    },[])
  return (
    <div>
      Interview {id}
      
    </div>
  )
}

export default Interview
