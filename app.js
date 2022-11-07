const express= require('express')
const Joi = require('joi')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // a piece of middleware that allows us to use req.body

let courses = [
    {id:1, title:'Course 1'},
    {id:2, title:'Course 2'},
    {id:3, title:'Course 3'}
]
app.get('/', (req, res)=>{
    res.send('Laurenzio')
})

app.post('/api/courses', (req, res)=>{

    const {error} = validationCourse(req.body)
    
    if(error){   
        res.status(400).send(error.details[0].message)
        return;
    }
    
    const course = {
        id: courses.length + 1,
        title: req.body.title
    }

    courses.push(course)
    res.send(course)
})

app.get('/api/courses/:id', (req, res)=>{
    
    const course = courses.find(item=> item.id == req.params.id)
    if(!course) {
        res.status(404).send(`Course with ID ${req.params.id} was not found`)
        return;
    }
    
    res.send(course)
})

app.put('/api/courses/:id', (req, res)=>{
    
    //Check if the course exists
    const course = courses.find(item=> item.id == req.params.id)
    if(!course) {
        res.status(404).send(`Course with ID ${req.params.id} was not found`)
        return;
    }

    //Validation
    const {error} = validationCourse(req.body)
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    course.title = req.body.title
    res.send(course)

})

app.delete('/api/courses/:id', (req, res)=>{
    
    //Check if the course exists
    const course = courses.find(item=> item.id == req.params.id)
    if(!course) {
        res.status(404).send(`Course with ID ${req.params.id} was not found`)
        return;
    }

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses)
})

const validationCourse = (course)=>{
    
    const schema = Joi.object({
        title: Joi.string().min(3).required()
    })

    return schema.validate(course)
}


app.listen(port, ()=>{
    console.log(`app listen on port ${port}`)
})