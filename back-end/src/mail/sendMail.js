const chalk = require('chalk')

const transporter = require('./transporter')

const emailName = process.env.EMAIL_NAME

const emailAddress = process.env.EMAIL_ADDRESS

const host = process.env.HOST

const trans = transporter()

// Display a log message to identify the transporter status
trans.then(t => console.log('transporter' in t ? chalk.hex('#009e00')('Email Check Passed') : chalk.red('Email Check Failed')))

module.exports = async (address, subject, body) => {

  // Identify host if mail is sent to overseer
  if (address === emailAddress) { body = `<div style="white-space: pre-wrap;">${body}\n\n<small style=""> ~ From ${host}</small></div>` }

  return await new Promise(resolve => {

    trans.then(async transport => {

      const mail = await transport.sendMail({

        from: `"${emailName}" <${emailAddress}>`, // sender address

        to: address, subject, html: body

      });

      resolve(mail)

    }).catch(e => {

      resolve({ error: 'Not Sent' })

    })

  })

}
