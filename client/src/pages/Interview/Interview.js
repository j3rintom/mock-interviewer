import React from 'react'
import { useParams } from 'react-router-dom'
const Interview = () => {
    const {id} = useParams()

  return (
    <div>
      Interview {id}
    </div>
  )
}

export default Interview
