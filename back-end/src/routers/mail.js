const express = require('express')

const sendMail = require('../mail/sendMail')

const { errorJson } = require('../middleware/errors')

const router = new express.Router()

const adminEmail = process.env.EMAIL_ADDRESS

router.post('/api/mail/send', async (req, res) => {

  const mailSubject = req.body.title

  const mailBody = req.body.content

  try {

    const mail = await sendMail(adminEmail, mailSubject, mailBody)

    if (mail.error) return errorJson(res, 503)

    res.status(201).send({ message: 'sent' })

  } catch (error) {

    errorJson(res, 500)

  }

})

module.exports = router

