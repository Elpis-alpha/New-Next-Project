const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema({

  owner: {

    type: mongoose.Schema.Types.ObjectId,

    required: true,

    ref: 'User'

  },

  name: {

    type: String,

    required: true,

    unique: true,

    trim: true,

  },

  description: {

    type: String,

    trim: true,

    required: true,

  },

}, { timestamps: true })

// Item Model
const Item = mongoose.model('Item', itemSchema)

module.exports = Item
