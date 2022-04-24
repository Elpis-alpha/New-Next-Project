const express = require('express')

const { errorJson, errorHtml } = require('../middleware/errors')

const router = new express.Router()

router.get('/api*', async (req, res) => { errorJson(res, 404) })

router.get('*', async (req, res) => { errorHtml(res, 404) })


router.post('/api*', async (req, res) => { errorJson(res, 404) })

router.post('*', async (req, res) => { errorHtml(res, 404) })


router.patch('/api*', async (req, res) => { errorJson(res, 404) })

router.patch('*', async (req, res) => { errorHtml(res, 404) })


router.put('/api*', async (req, res) => { errorJson(res, 404) })

router.put('*', async (req, res) => { errorHtml(res, 404) })


router.delete('/api*', async (req, res) => { errorJson(res, 404) })

router.delete('*', async (req, res) => { errorHtml(res, 404) })


module.exports = router
