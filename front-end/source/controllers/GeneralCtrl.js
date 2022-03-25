import Cookies from 'universal-cookie';

import { randomAmong } from './SpecialCtrl'

import store from '../store/store';

import { sendXMessage } from './MessageCtrl';


export const processCookies = () => {

  const cookies = new Cookies()

  const allowedCookies = cookies.get('allow-cookies') === 'true'

  if (allowedCookies !== true) {

    const unsubscribe = store.subscribe(() => {

      if (store.getState().user.tested === true) {

        unsubscribe()

        setTimeout(async () => {

          const xMessg = await sendXMessage({

            heading: { text: "Cookies Settings", style: {} },

            content: { text: "We use cookies primarily for authentication and combined with other technologies to provide you with a better user experience. \nBy Clicking 'Accept Cookies', you agree to our cookie policy", style: { textAlign: 'left' } },

            buttons: [

              { text: 'Accept Cookies', waitFor: 'allowed', style: { backgroundColor: '#2e2e52' } }

            ],

            style: {}

          })

          if (xMessg === 'allowed') { cookies.set('allow-cookies', true, { path: '/', expires: new Date(90 ** 7) }) }

        }, randomAmong(4000, 10000));

      }

    })

  }

}
