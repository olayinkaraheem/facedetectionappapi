const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'police',
        database : 'facedetectionapp'
    }
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=>{ res.json("Olayinka Raheem says 'Welcome!'") })

app.post('/signup', register.handleRegister(db, bcrypt))

app.post('/signin', (req, res)=>{ signin.handleSignin(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res)=>{ profile.handleGetProfile(req, res, db) })

app.put('/image', (req, res)=>{ image.handleImage(req, res, db)  })

app.post('/imageurl', (req, res)=>{ image.handleApiCall(req, res)  })

/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`)
})