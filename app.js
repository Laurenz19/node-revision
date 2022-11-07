const debug = require('debug')('app:startup')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const logger = require('./middleware/logger')
const course = require('./routes/course')
const home = require('./routes/home')
const express= require('express')
const app = express()
const port = process.env.PORT || 3000


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)
// console.log(config.get('name'))
// console.log(config.get('mail.host'))
// console.log(`password: ${config.get('mail.password')}`)

/**
 * Install Middleware in Request 
 * processing pipeline
 */
app.use(express.json()) // a piece of middleware that allows us to parse the req.body to json
app.use(express.urlencoded( {extended:true} ))
app.use(express.static('public'))
app.use(helmet())
app.use(logger)

if(app.get('env') === 'development'){
    app.use(morgan('dev'))
    debug('morgan enabled...') // instead of console.log('morgan enabled') we can use debug
}

app.use('/api/courses', course)
app.use('/', home)


app.listen(port, ()=>{
    console.log(`app listen on port ${port}`)
})