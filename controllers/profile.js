 const handleGetProfile = (req, res , db)=>{
    const { id } = req.params

    db.select('*').from('users').where({id})
    .then( user => {
        if(user.length){
            res.json(user[0])
        } else {
            res.json('No user found')
        }
    })
    .catch( err => {
        res.status(400).json('No valid user found')
    })
    /*let found = false
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            return res.json(user)
        }
    })
    
    if(!found){
        res.status(404).json('User does not exist')        
    }*/
}

module.exports = {
	handleGetProfile: handleGetProfile
}