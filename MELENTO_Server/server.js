const express = require('express')
const assessment = require('./controllers/assessment')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const cors = require("cors")

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const server = app.listen(port, () => console.log(`Server listening on port ${port}!`))

// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/assessment',assessment.findAssessment)

app.get('/assessment',(req,res)=>{
    assessment.getAssessment(req,res)
})

app.post('/assessment',(req,res)=>{
    assessment.addAssessment(req,res)
})

app.put('/assessment/:id',(req,res)=>{
    assessment.updateAssessment(req,res)
})

// app.get('/assessment/:id',assessment.getAssessment)
// app.put('/assessment/:id', assessment.updateAssessment);
// app.post('/assessment', assessment.addAssessment);
// app.delete('/assessment/:id', assessment.deleteAssessment);
