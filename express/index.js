const express = require('express');
const path = require('path')
const uuid = require('uuid');
const cors = require('cors');
const logger = require ('./middleware/logger')
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser')
const members = require('./Members');
const auth=require ('./middleware/auth')
const tokenMAp = {}

// Create an express app
const app = express();

//enable cors
app.use(cors({credentials: true, origin: 'http://localhost:4200'}))
//Init logger
// app.use(logger)

//parser 
app.use(bodyParser.json())


//cookie parser Middleware
app.use(cookieParser())


//Body parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', auth, require('./routes/api/members'))

// Dummy auth

app.get('/private', auth, (req, res)=> res.send('hello authorized user'));
app.post('/login', (req, res)=>{
  const user = members.find((_member)=> req.body.name === _member.name)
  if(!user || req.body.password !== '123'){
    return res.status(422).json({error: 'Incorrect email or password'})
  }

  //generate token with uuid
  const sessionToken = uuid.v4()
  const expiresAt = new Date().setFullYear(new Date().getFullYear() + 1)

  tokenMAp[sessionToken]={
    expiresAt,
    userId : user.id
  }
  res.cookie("session_token", sessionToken, {maxAge: expiresAt})
  res.send({user: user, token:sessionToken})

})





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

