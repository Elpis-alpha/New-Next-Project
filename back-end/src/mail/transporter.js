const { createTransport } = require('nodemailer')

const { google } = require('googleapis')


const CLIENT_ID = process.env.OVERSEER_CLIENT_ID

const CLIENT_SECRET = process.env.OVERSEER_CLIENT_SECRET

const REDIRECT_URI = process.env.OVERSEER_REDIRECT_URI

const REFRESH_TOKEN = process.env.OVERSEER_REFRESH_TOKEN

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const createTransporter = async () => {

  try {

    const accessToken = await oauth2Client.getAccessToken()

    const transporter = createTransport({

      service: "gmail",

      auth: {

        type: "OAuth2",

        user: EMAIL_ADDRESS,

        clientId: CLIENT_ID,

        clientSecret: CLIENT_SECRET,

        refresh_token: REFRESH_TOKEN,

        accessToken: accessToken.token

      },

    });

    return transporter

  } catch (error) {

    return error

  }

}

module.exports = createTransporter
