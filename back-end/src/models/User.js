const mongoose = require('mongoose')

const validator = require('validator')

const bcryptjs = require('bcryptjs')

const jsonwebtoken = require('jsonwebtoken');

const { v4 } = require('uuid');

const Item = require('./Item');

const sendMail = require('../mail/sendMail');

const { welcomeMail, exitMail } = require('../mail/mailTypes');

const siteName = process.env.SITE_NAME

const host = process.env.HOST

// Sets up user schema
const userSchemer = new mongoose.Schema({

  name: {

    type: String,

    required: true,

    trim: true,

  },

  age: {

    type: Number,

    default: 0,

    min: [0, 'Must be at greater than zero, got {VALUE}']

  },

  email: {

    type: String,

    trim: true,

    unique: true,

    required: true,

    lowercase: true,

    default: 0,

    validate(value) {

      if (!validator.isEmail(value)) {

        throw new Error('Email is invalid')

      }

    }

  },

  password: {

    type: String,

    trim: true,

    required: true,

    minlength: 7,

    validate(value) {

      if (value.toLowerCase().includes('password')) {

        throw new Error('Password must not include "password"')

      }

    },

  },

  tokens: [

    {

      token: {

        type: String,

        required: true

      }

    }

  ],

  avatar: {

    type: Buffer

  },

  avatarSmall: {

    type: Buffer

  },

  verify: {

    type: String,

    trim: true,

    default: v4()

  },

}, { timestamps: true });


// Create Virtual relationship with Item
userSchemer.virtual('items', {

  ref: 'Item',

  localField: '_id',

  foreignField: 'owner'

})


// Generate Authentication Token
userSchemer.methods.generateAuthToken = async function () {

  const user = this

  const token = jsonwebtoken.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, {})

  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token

}


// Private profile
userSchemer.methods.toJSON = function () {

  const user = this

  const returnUser = user.toObject()

  returnUser.verify = returnUser.verify === "true"
  
  delete returnUser.password
  
  delete returnUser.tokens

  delete returnUser.avatar

  delete returnUser.avatarSmall

  return returnUser

}


// Public profile
userSchemer.methods.toPublicJSON = function () {

  const user = this

  const returnUser = user.toObject()

  returnUser.verify = returnUser.verify === "true"

  delete returnUser.password

  delete returnUser.tokens

  delete returnUser.age

  delete returnUser.avatar

  delete returnUser.avatarSmall

  return returnUser

}


// send verification mail
userSchemer.methods.sendVerificationEmail = async function () {

  const user = this

  const mailBody = welcomeMail(siteName, `${host}/mail/welcome-mail/${user._id}/${user.verify}`)

  try {

    const mail = await sendMail(user.email, `Welcome to ${siteName}`, mailBody)

    if (mail.error) return { error: 'Server Error' }

    return { message: 'email sent' }

  } catch (error) {

    return { error: 'Server Error' }

  }

}


// send verification mail
userSchemer.methods.sendExitEmail = async function () {

  const user = this

  const mailBody = exitMail(siteName, `${host}/complain`)

  try {

    const mail = await sendMail(user.email, `Goodbye ${user.name}`, mailBody)

    if (mail.error) return { error: 'Server Error' }

    return { message: 'email sent' }

  } catch (error) {

    return { error: 'Server Error' }

  }

}


// For login
userSchemer.statics.findbyCredentials = async (email, password) => {

  const user = await User.findOne({ email })

  if (!user) throw new Error('Unable to login')

  const isMatch = await bcryptjs.compare(password, user.password)

  if (!isMatch) throw new Error('Unable to login')

  return user

}


// Hash password
userSchemer.pre('save', async function (next) {

  const user = this

  if (user.isModified('password')) user.password = await bcryptjs.hash(user.password, 8)

  next()

})


// Delete (cascade) tasks
userSchemer.pre('remove', async function (next) {

  const user = this

  await Item.deleteMany({ owner: user._id })

  next()

})


// Create User Model
const User = mongoose.model('User', userSchemer)


module.exports = User
