 const handleRegister = (db, bcrypt) => (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json('All Fields Are Required')
    }
    // let hashed_password
    /*database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        rank: 0,
        joined: new Date(),
    })*/
    const hash = bcrypt.hashSync(password)
    // I could hae done insert() into() for both but want to see what's possible
    // and not
    db.transaction( trx => {
        trx.insert({
            email: email,
            hash: hash
        })
        .returning('email')
        .into('login')
        .then( loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then( user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch( err => {
        res.status(400).json('Unable to complete registration')
    })
}

module.exports = {
	handleRegister: handleRegister
}