const router = require('express').Router()
const Joi = require('joi')

let courses = [
    {id:1, title:'Course 1'},
    {id:2, title:'Course 2'},
    {id:3, title:'Course 3'}
]

router.post('/', (req, res)=>{

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

router.get('/:id', (req, res)=>{
    
    const course = courses.find(item=> item.id == req.params.id)
    if(!course) {
        res.status(404).send(`Course with ID ${req.params.id} was not found`)
        return;
    }
    
    res.send(course)
})

router.put('/:id', (req, res)=>{
    
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

router.delete('/:id', (req, res)=>{
    
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


module.exports = router