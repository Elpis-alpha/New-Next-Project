const welcomeMail = (siteName, url) => {

  return `

    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5rem;">

      <div>

        <h1 style="margin: 0; padding: .5rem 1rem; padding-bottom: .5rem; font-family: inherit; color: #727272; line-height: 3rem;">

          Welcome to ${siteName}

        </h1>

      </div>

      <p style="margin: 0; padding: 0 1rem; font-family: inherit; color: #727272;">
        &nbsp; &nbsp; &nbsp; Thanks for sigining up with us at ${siteName}, we hope you enjoy your stay here.
        We offer a variety of services and features which includes the following:
      </p>

      <ul style="margin: 0; padding: 1rem 1rem 1rem 3rem; font-family: inherit; color: #727272;">
        <li>Creation of Accounts</li>
        <li>Blah blahh</li>
        <li>Blah blahh</li>
        <li>Blah blahh</li>
      </ul>

      <p style="margin: 0; padding: 0 1rem; font-family: inherit; color: #727272;">
        Kindly verify your email by clicking the button
        below. Also, if you didn't create this account kindly click the button all the same as you'll be provided with the
        option to
        delete the account and possibly create another if desired.
      </p>

      <a href="${url}"
        target="_blank" rel="noopener noreferrer" style="background: #3c73e9; display: inline-block; padding: 10px 30px; 
        margin: .5rem 1rem; border-radius: .5rem; color: white; text-decoration: none;">

        Verify your Email

      </a>

    </div>

  `

}

const exitMail = (siteName, url) => {

  return `

    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5rem;">

      <div>

        <h1 style="margin: 0; padding: .5rem 1rem; padding-bottom: .5rem; font-family: inherit; color: #727272; line-height: 3rem;">

          ${siteName} says her goodbyes

        </h1>

      </div>

      <p style="margin: 0; padding: 0 1rem; font-family: inherit; color: #727272;">
        We're sad to see you leave, kindly click the button below to lodge any complaints
        or to offer advice to the admin.
      </p>

      <a href="${url}"
        target="_blank" rel="noopener noreferrer" style="background: #3c73e9; display: inline-block; padding: 10px 30px; 
        margin: .5rem 1rem; border-radius: .5rem; color: white; text-decoration: none;">

        Complain

      </a>

    </div>

  `

}


module.exports = { welcomeMail, exitMail }