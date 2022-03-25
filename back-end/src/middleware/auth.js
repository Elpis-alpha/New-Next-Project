const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/User')


const auth = async (req, res, next) => {

  try {

    const token = req.header('Authorization').replace('Bearer ', '')

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })

    if (!user) throw new Error('Invalid Token')
      
    req.token = token

    req.user = user

    next()

  } catch (error) {

    res.status(401).send({ error: 'Not Authenticated' })

  }

}

module.exports = auth