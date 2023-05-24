const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000;
const API_KEY = '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'

app.post('/completions',async(req,res)=>{
const {message} = req.body
const options = {
    method:"POST",
    headers:{
        "Authorization":`Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
    body:JSON.stringify({ 
        model: "gpt-3.5-turbo",
        messages:[{role:'user',content:message}],
        max_tokens:200,
    })
}
try {
    const response = await fetch('https://api.openai.com/v1/chat/completions',options)
    const reply = await response.json()
    res.send(reply.choices[0].message.content)
    console.log(reply.choices[0].message.content);
} catch (error) {
    console.log(error);
}

})

app.listen(PORT ,()=> console.log(`App listening on port ${PORT}`))