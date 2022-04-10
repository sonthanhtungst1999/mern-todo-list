const mongoose  = require('mongoose')

const connect = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-todolist.clea1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
        console.log('MongoDB connected !!!')
    }
    catch(err) {
        console.log('MongoDB connect failed')
    }
}

module.exports = { connect }