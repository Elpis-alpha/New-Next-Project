const express = require('express')

const chalk = require('chalk')

const cors = require('cors')

const path = require('path')

const hbs = require('hbs')

const mongoose = require('./db/mongoose')

const userRouter = require('./routers/user')

const itemRouter = require('./routers/item')

const renderRouter = require('./routers/render')

const _404Router = require('./routers/404')

const delay = require('./middleware/delay')

const mailRouter = require('./routers/mail')

const port = process.env.PORT

const isProduction = process.env.IS_PRODUCTION === 'true'


// Acquire an instance of Express
const app = express()


// Access the public path
const publicPath = path.join(__dirname, '../public')


// Access the partials path
const viewsPath = path.join(__dirname, '../template/views')


// Access the partials path
const partialsPath = path.join(__dirname, '../template/partials')


// Automatically serve public (static) files
app.set('view engine', 'hbs')


// Automatically serve view hbs files
app.set('views', viewsPath)


// Automatically serve partials as hbs files
hbs.registerPartials(partialsPath)


// Automatically serve public (static) files
app.use(express.static(publicPath))


// Automatically parse incoming reqests
app.use(express.json({ limit: "20mb" }))


// Automatically parse form body and encodes
app.use(express.urlencoded({ extended: true }))


// Automatically allow incomming incoming cors
app.use(cors())


// One second delay for local development
if (!isProduction) { app.use(delay) }


// Automatically allows user routers
app.use(userRouter)


// Automatically allows task routers
app.use(itemRouter)


// Automatically allows html routers
app.use(renderRouter)


// Automatically allows mail api routers
app.use(mailRouter)


// Automatically allows 404 routers
app.use(_404Router)


// Listening Server
app.listen(port, () => {

  console.log(chalk.yellow('\n\nInitializing Server'));

  console.log(chalk.hex('#009e00')(`Server started successfully on port ${port}`));

})
