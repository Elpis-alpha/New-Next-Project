const express = require('express')

const multer = require('multer')

const sharp = require('sharp')

const User = require('../models/User')

const auth = require('../middleware/auth')

const router = new express.Router()


const upload = multer({

  limits: { fileSize: 20000000 },

  fileFilter(req, file, cb) {

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) cb(new Error('Please upload an image'))

    cb(undefined, true)

  }

})

// Sends post request to create new user
router.post('/api/users', async (req, res) => {

  const newUser = User(req.body)

  try {

    await newUser.save()

    const token = await newUser.generateAuthToken()

    const verifyUser = await newUser.sendVerificationEmail()

    res.status(201).send({ user: newUser, token })

  } catch (error) {

    console.log(error);

    res.status(400).send({ error: 'Server Error' })

  }

})


// sends get request to send verification mail to auth user
router.get('/api/users/user/verify', auth, async (req, res) => {

  const verifyUser = await req.user.sendVerificationEmail()

  return res.send(verifyUser)

})


// Sends post request to log user in
router.post('/api/users/login', async (req, res) => {

  const userData = User(req.body)

  try {

    const user = await User.findbyCredentials(userData.email, userData.password)

    const token = await user.generateAuthToken()

    res.status(200).send({ user, token })

  } catch (error) {

    res.status(400).send({ error: 'Server Error' })

  }

})


// Sends post request to log user out
router.post('/api/users/logout', auth, async (req, res) => {

  try {

    req.user.tokens = req.user.tokens.filter(item => item.token != req.token)

    await req.user.save()

    res.status(200).send({ message: 'Logout Successful' })

  } catch (error) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// Sends post request to log user out
router.post('/api/users/logout/all', auth, async (req, res) => {

  try {

    req.user.tokens = []

    await req.user.save()

    res.status(200).send({ message: 'Logout Successful' })

  } catch (error) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// sends get request to fetch auth user
router.get('/api/users/user', auth, async (req, res) => {

  res.send(req.user)

})


// sends get request to fetch user by id
router.get('/api/users/id/:id', async (req, res) => {

  const _id = req.params.id

  try {

    const user = await User.findById(_id)

    if (!user) return res.status(404).send({ error: 'Server Error' })

    res.send(user.toPublicJSON())

  } catch (e) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// sends get request to fetch user by id
router.get('/api/users/email/:email', async (req, res) => {

  const email = req.params.email

  try {

    const user = await User.findOne({ email: email })

    if (!user) return res.status(404).send({ error: 'Server Error' })

    res.send(user.toPublicJSON())

  } catch (e) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// Sends patch request to update users
router.patch('/api/users/user', auth, async (req, res) => {

  const updates = Object.keys(req.body)

  const allowedUpdate = ['name', 'email', 'password', 'age']

  const isValidOp = updates.every(item => allowedUpdate.includes(item))

  if (!isValidOp) return res.status(400).send({ error: 'Invalid Updates', allowedUpdates: allowedUpdate })

  try {

    // Because of password middleware
    const user = req.user

    updates.forEach(item => user[item] = req.body[item])

    await user.save()

    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

    res.status(201).send(user)

  } catch (error) {

    res.status(400).send({ error: 'Server Error' })

  }

})


// Sends delete request to delete users
router.delete('/api/users/user', auth, async (req, res) => {

  try {

    const user = req.user

    await user.sendExitEmail()

    await User.deleteOne({ _id: user._id })

    res.send({ message: 'user deleted' })

  } catch (error) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// Sends post request to create and upload the users profile avatar
router.post('/api/users/user/avatar', auth, upload.single('avatar'), async (req, res) => {

  try {

    const bufferSmall = await sharp(req.file.buffer).resize({ width: 100 }).png({ quality: 20 }).toBuffer()

    const buffer = await sharp(req.file.buffer).resize({ width: 900 }).png({ quality: 20 }).toBuffer()

    req.user.avatar = buffer

    req.user.avatarSmall = bufferSmall

    await req.user.save()

    res.send({ message: 'Image Saved' })

  } catch (error) {

    res.status(400).send({ error: 'Server Error' })

  }

}, (error, req, res, next) => res.status(400).send({ error: error.message }))


// Sends delete request to delete the users profile avatar
router.delete('/api/users/user/avatar', auth, async (req, res) => {

  try {

    const user = req.user

    user.avatar = undefined

    user.avatarSmall = undefined

    await user.save()

    res.send({ message: 'avatar removed' })

  } catch (error) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// Sends get request to render profile avatar
router.get('/api/users/pic-id/:id/avatar', async (req, res) => {

  try {

    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) throw new Error()

    res.set('Content-Type', 'image/png')

    if (req.query.size === "small") { res.send(user.avatarSmall) }

    else { res.send(user.avatar) } // large

  } catch (error) {

    res.status(404).send({ error: 'Server Error' })

  }

})


// sends get request to check user existence
router.get('/api/users/user/exists', async (req, res) => {

  try {

    const user = await User.findOne({ email: req.query.email })

    if (user === null) { return res.status(200).send({ message: 'user does not exist' }) }

    res.send({ message: 'user exists' })

  } catch (error) {

    res.status(200).send({ message: 'user exists' })

  }

})


module.exports = router
