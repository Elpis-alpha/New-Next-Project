const express = require('express')

const { errorJson, errorHtml } = require('../middleware/errors')

const email = process.env.EMAIL_ADDRESS

const frontendLocation = process.env.FRONT_END_LOCATION

const siteName = process.env.SITE_NAME

const router = new express.Router()

router.get('/api*', async (req, res) => { errorJson(res, 404) })

router.get('*', async (req, res) => { errorHtml(res, 404) })

module.exports = router
