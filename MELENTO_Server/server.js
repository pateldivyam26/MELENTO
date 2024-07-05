const express = require('express')
const assessment = require('./controllers/assessment')
const port = process.env.PORT || 3330
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Server listening on port ${port}!`))
app.get('/assessment',assessment.listAssessment)
app.get('/assessment/:id',assessment.getAssessment)
app.put('/assessment/:id', assessment.updateAssessment);
app.post('/assessment', assessment.addAssessment);
app.delete('/assessment/:id', assessment.deleteAssessment);
const server = app.listen(port, () => console.log(`Server listening on port ${port}!`))