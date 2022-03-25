import { setMiniMessage, setNormalMessage, setSmallMessage, setXMessage } from '../store/slice/messagesSlice'

import store from '../store/store'


export const sendMiniMessage = ({ icon = {}, content = {}, style = {} }, time) => {

  icon = icon === undefined ? 'ok' : icon

  store.dispatch(setMiniMessage({ show: true, content, style, icon }))

  if (time === undefined) { return false }

  let newTime = parseInt(time)

  newTime = newTime < 51000 ? newTime : 1000

  setTimeout(() => {

    const state = store.getState().messages.miniMessage

    if (state.content.text === content.text) { removeMiniMessage() }

  }, newTime);

}

export const removeMiniMessage = () => {

  store.dispatch(setMiniMessage({

    icon: { name: "", style: {} },

    content: { text: "", style: {} },

    show: false,

    style: undefined

  }))

}

export const sendSmallMessage = ({ heading = {}, content = {}, style = {} }, time) => {

  removeSmallMessage()

  store.dispatch(setSmallMessage({ show: true, heading, content, style }))

  if (time === undefined) { return false }

  let newTime = parseInt(time)

  newTime = newTime < 10001 ? newTime : 1000

  setTimeout(() => {

    const state = store.getState().messages.smallMessage

    if (state.content.text === content.text) { removeSmallMessage() }

  }, newTime);

}

export const removeSmallMessage = () => {

  store.dispatch(setSmallMessage({

    show: false,

    heading: { text: "", style: {} },

    content: { text: "", style: {} },

    style: undefined

  }))

}

export const sendNormalMessage = async ({ heading = {}, content = {}, style = {} }) => {

  const accepted = await new Promise(resolve => {

    const stateX = store.getState().messages.normalMessage

    if (stateX.show === true) { return false }

    store.dispatch(setNormalMessage({ show: true, heading, content, answer: "", style }))

    const unsubscribe = store.subscribe(() => {

      const state = store.getState().messages.normalMessage

      if (state.answer !== "") {

        unsubscribe()

        resolve(state.answer)

        removeNormalMessage()

      }

    })

  });

  return accepted

}

export const removeNormalMessage = () => {

  store.dispatch(setNormalMessage({

    show: false,

    heading: { text: "", style: {} },

    content: { text: "", style: {} },

    answer: "",

    style: undefined

  }))

}

export const sendXMessage = async ({ heading = {}, content = {}, buttons = [], style = {} }) => {

  const accepted = await new Promise(resolve => {

    const stateX = store.getState().messages.XMessage

    if (stateX.show === true) { return false }

    store.dispatch(setXMessage({ show: true, heading, content, buttons, answer: "", style }))

    const unsubscribe = store.subscribe(() => {

      const state = store.getState().messages.XMessage

      if (state.answer !== "") {

        unsubscribe()

        resolve(state.answer)

        removeXMessage()

      }

    })

  });

  return accepted

}

export const removeXMessage = () => {

  store.dispatch(setXMessage({

    show: false,

    heading: { text: "", style: {} },

    content: { text: "", style: {} },

    buttons: [],

    answer: ""

  }))

}

/* How to use me 

const xMessg = await sendXMessage({

  heading: { text: "Cookies Settings", style: {} },

  content: { text: "We use cookies primarily for authentication sanlk asdlkknasd sdalksda ljads", style: { textAlign: 'left' } },

  buttons: [

    { text: 'Accept', waitFor: 'allowed', style: { backgroundColor: '#2e2e52' } }

  ],

  style: {}

})

const normMessg = await sendNormalMessage({

  heading: { text: "Welcome to the New World", style: {} },

  content: { text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus, earum excepturi iusto quibusdam.", style: {} },

  style: {}

})

const smallMessg = sendSmallMessage({

  heading: { text: "You just became smarter", style: { padding: '.5rem' } },

  content: { text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus, earum excepturi iusto quibusdam.", style: {} },

  style: {}

}, 4000)

const miniMessg = sendMiniMessage({

  icon: { name: "copy", style: {} },

  content: { text: "Text Copied!", style: {} },

  style: {}

}, 2000)

*/
