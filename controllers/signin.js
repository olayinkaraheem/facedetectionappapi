 const handleSignin = (req, res , db, bcrypt)=>{
    
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json('Email or Password Cannot Be Empty')
    }
    /*
    // '$2a$10$QWU7V/vJHrQLEQcs2MKVk./FsTOjsVRS4BCWBGVjjisunMLTwrblq'
    
    // Load hash from your password DB.
    bcrypt.compare("andrei123", '$2a$10$E2BqHG.JrZIsFLKLgmDLiOn6I3.clqfh2MnVBoNWW.S2VRFQgp0Qe', function(err, res) {
        // res == true
        console.log("First Comparison", res)
    });
    bcrypt.compare("ola123", '$2a$10$E2BqHG.JrZIsFLKLgmDLiOn6I3.clqfh2MnVBoNWW.S2VRFQgp0Qe', function(err, res) {
        // res = false
        console.log("Second Comparison", res)
    });
    
    if (req.body.email === database.users[0].email){
        res.json('signin successful')
    } else {
        res.status('400').json('signin failed')        
    }*/


    db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then( data => {
        const passIsValid = bcrypt.compareSync(password, data[0].hash)
        if(passIsValid){
            return db('users')
                .returning('*')
                .where('email','=', data[0].email)
                .then( user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('Unable to fetch user'))
        } else {
            res.status('400').json('Invalid Login Details')
        }
    })
    .catch(err => res.status(400).json('Invalid Login Details.'))

}

module.exports = {
	handleSignin: handleSignin
}