const Application = (() => {

  let UIVars = () => {

    return {

      mailIdeaForm: UICtrl.findElement('#mail-idea'),

      mailIdeaButton: UICtrl.findElement('#mail-idea .hexx'),

      mailContent: UICtrl.findElement('#mail-content'),

    }

  }

  const loadEventListeners = () => {

    UIVars.mailIdeaForm.addEventListener('submit', async e => {

      e.preventDefault()

      const content = UIVars.mailContent.value

      const button = UIVars.mailIdeaButton

      button.disabled = true

      let mailReply = await fetch("/api/mail/send", {

        method: 'POST',

        headers: {

          'Content-type': 'application/json',

        },

        body: JSON.stringify({

          title: `${user.name} sends an idea`,

          content: `Name: ${user.name}\nEmail: ${user.email}\n\n${content}`

        })

      })

      let mailReplyJson = await mailReply.json()

      if ('message' in mailReplyJson) {

        MessageCtrl.sendMiniMessage('Message Sent', 5000)

        UIVars.mailContent.value = ""

      } else {

        MessageCtrl.sendMiniMessage('An error occured', 5000)

      }

      button.disabled = false

    })

  }

  const loadInit = async function () {


  }

  const coreInit = () => {


  }

  return {

    init: () => {

      UIVars = UIVars()

      loadEventListeners()

      coreInit()

      loadInit()

      console.log('Application is successfully running...')

    }

  }

})()


// Initialize Application
document.addEventListener('DOMContentLoaded', Application.init)