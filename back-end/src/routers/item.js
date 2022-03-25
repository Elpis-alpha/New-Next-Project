const express = require('express')

const Item = require('../models/Item')

const auth = require('../middleware/auth')

const router = new express.Router()


// Sends post request to create items
router.post('/api/items', auth, async (req, res) => {

  const newItem = new Item({

    ...req.body,

    owner: req.user._id

  })

  try {

    await newItem.save()

    res.status(201).send(newItem)

  } catch (error) {

    res.status(400).send(error)

  }

})


// Sends get request to get all items
router.get('/api/items', auth, async (req, res) => {

  const sort = {}

  if (req.query.sortBy) {

    const query = req.query.sortBy.split(':')

    query[1] = query[1] === 'asc' ? 1 : -1

    sort[query[0]] = query[1]

  }

  try {

    await req.user.populate({

      path: 'items',

      options: {

        limit: parseInt(req.query.limit),

        skip: parseInt(req.query.skip),

        sort

      }

    })

    res.send(req.user.items)

  } catch (error) {

    res.status(500).send({ error: 'Server Error' })

  }

})


// Sends get request to get all specific item
router.get('/api/items/:id', auth, async (req, res) => {

  const _id = req.params.id

  try {

    const item = await Item.find({ _id, owner: req.user._id })

    if (!item) return res.status(404).send()

    res.send(item)

  } catch (error) {

    res.status(404).send()

  }

})


// Sends patch request to update items
router.patch('/api/items/:id', auth, async (req, res) => {

  const _id = req.params.id

  const updates = Object.keys(req.body)

  const allowedUpdate = ['name', 'description']

  const isValidOp = updates.every(item => allowedUpdate.includes(item))

  if (!isValidOp) return res.status(400).send({ error: 'Invalid Updates', allowedUpdates: allowedUpdate })

  try {

    const item = await Item.findOne({ _id, owner: req.user._id })

    updates.forEach(item => item[item] = req.body[item])

    await item.save()

    if (!item) return res.status(404).send({ error: 'Not Found' })

    res.status(201).send(item)

  } catch (error) {

    res.status(400).send(error)

  }

})


// Sends delete request to delete items
router.delete('/api/items/:id', auth, async (req, res) => {

  const _id = req.params.id

  try {

    const item = await Item.findOneAndDelete({ _id, owner: req.user._id })

    if (!item) return res.status(404).send()

    res.send(item)

  } catch (error) {

    res.status(500).send()

  }

})


module.exports = router
