const mongoose = require('mongoose')


// Connect Mongo Database
mongoose.connect(process.env.MONGODB_URL)
