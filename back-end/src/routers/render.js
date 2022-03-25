const express = require('express')

const User = require('../models/User')

const { errorHtml } = require('../middleware/errors')

const sendMail = require('../mail/sendMail')

const adminEmail = process.env.EMAIL_ADDRESS

const frontendLocation = process.env.FRONT_END_LOCATION

const siteName = process.env.SITE_NAME

const router = new express.Router()


router.get('/', async (req, res) => {

  res.render('index', {

    title: siteName,

    siteName, frontendLocation,

    complainLink: `/complain`,

  })

})

router.get('/complain', async (req, res) => {

  try {

    res.render('complain', {

      title: siteName,

      siteName, frontendLocation,

      title: siteName + " | Complaint"

    })

  } catch (e) {

    errorHtml(res, 500)

  }

})

router.post('/accept-complaint', async (req, res) => {

  try {

    if (req.body.content.trim() === "" || req.body.title.trim() === "") return errorHtml(res, 400)

    const mail = await sendMail(adminEmail, "A Complaint: " + req.body.title, req.body.content)

    if (mail.error) return errorHtml(res, 503)

    res.render('accept-complaint', {

      title: siteName,

      siteName, frontendLocation,

      title: siteName + " | Accepted"

    })

  } catch (e) {

    errorHtml(res, 500)

  }

})

router.get('/mail/welcome-mail/:id/:verify', async (req, res) => {

  const _id = req.params.id

  const verify = req.params.verify

  try {

    const user = await User.findById(_id)

    if (!user) return errorHtml(res, 404)

    if (user.verify !== verify) return errorHtml(res, 401)

    res.render('mail/welcome-mail', {

      title: siteName, user: user.toJSON(),

      siteName, frontendLocation,

      userString: JSON.stringify(user.toJSON()),

      verifyLink: `/mail/verify-user/${_id}/${verify}`,

      complainLink: `/complain`,

      deleteLink: `/mail/delete-user/${_id}/${verify}`,

    })

  } catch (e) {

    errorHtml(res, 500)

  }

})

router.get('/mail/verify-user/:id/:verify', async (req, res) => {

  const _id = req.params.id

  const verify = req.params.verify

  try {

    const user = await User.findById(_id)

    if (!user) return errorHtml(res, 404)

    if (user.verify !== verify) return errorHtml(res, 401)

    if (user.verify === "true") return errorHtml(res, 403)

    user.verify = "true"

    await user.save()

    res.render('mail/verify-user', {

      title: siteName, user: user.toJSON(),

      siteName, frontendLocation,

      userString: JSON.stringify(user.toJSON()),

      title: siteName + " | Verify Email",

      complainLink: `/complain`,

    })

  } catch (e) {

    errorHtml(res, 500)

  }

})

router.get('/mail/delete-user/:id/:verify', async (req, res) => {

  const _id = req.params.id

  const verify = req.params.verify

  try {

    const user = await User.findById(_id)

    if (!user) return errorHtml(res, 404)

    if (user.verify !== verify) return errorHtml(res, 401)

    if (user.verify === "true") return errorHtml(res, 403)

    await User.deleteOne({ _id, verify })

    res.render('mail/delete-user', {

      title: siteName,

      siteName, frontendLocation,

      title: siteName + " | Delete Account",

      complainLink: `/complain`,

    })

  } catch (e) {

    errorHtml(res, 500)

  }

})


module.exports = router
