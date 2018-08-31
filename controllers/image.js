 const Clarifai = require('clarifai')

 const app = new Clarifai.App({
                apiKey: process.env.API_KEY
            });
 const handleApiCall = (req, res) => {
    const { input } = req.body

    // predict the contents of an image by passing in a url
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then( data => res.json(data))
    .catch( err => res.status(400).json('Failed To Detect Face Or Network Error'))

 }
 
const handleImage = (req, res , db)=>{
    const { id } = req.body    
    db('users')
    .returning('entries')
    .increment('entries', 1)
    .where('id', '=', id)
    .then( entries => {
        res.json(entries[0])
    })
    .catch( err => {
        res.status(400).json('Unable to update entries')
    })
    /*let found = false
    
    database.users.forEach(user => {
        if(user.id === id){
            found = true
            user.rank++
            return res.json(user.rank)
        }
    })

    if(!found){
        res.status(404).json('User does not exist')        
    }*/
}

module.exports = {
    handleImage: handleImage,
	handleApiCall: handleApiCall
}