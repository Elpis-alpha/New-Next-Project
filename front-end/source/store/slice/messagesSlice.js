import { createSlice } from '@reduxjs/toolkit'


const itemSlice = createSlice({

  name: "messages",

  initialState: {

    miniMessage: {

      icon: { name: "", style: {} },

      content: { text: "", style: {} },

      show: false,

      style: undefined

    },

    smallMessage: {

      show: false,

      heading: { text: "", style: {} },

      content: { text: "", style: {} },

      style: undefined

    },

    normalMessage: {

      show: false,

      heading: { text: "", style: {} },

      content: { text: "", style: {} },

      answer: "",

      style: undefined

    },

    XMessage: {

      show: false,

      heading: { text: "", style: {} },

      content: { text: "", style: {} },

      buttons: [],

      answer: "",

      style: undefined

    },

  },

  reducers: {

    setMiniMessage: (state, { payload }) => {

      state.miniMessage.style = payload.style

      state.miniMessage.content = payload.content

      state.miniMessage.icon = payload.icon

      state.miniMessage.show = payload.show

    },

    setSmallMessage: (state, { payload }) => {

      state.smallMessage.heading = payload.heading

      state.smallMessage.content = payload.content

      state.smallMessage.style = payload.style

      state.smallMessage.show = payload.show

    },

    setNormalMessage: (state, { payload }) => {

      state.normalMessage.heading = payload.heading

      state.normalMessage.content = payload.content

      state.normalMessage.style = payload.style

      state.normalMessage.answer = payload.answer

      state.normalMessage.show = payload.show

    },

    setNormalMessageAnswer: (state, { payload }) => {

      state.normalMessage.answer = payload

    },

    setXMessage: (state, { payload }) => {

      state.XMessage.heading = payload.heading

      state.XMessage.content = payload.content

      state.XMessage.style = payload.style

      state.XMessage.show = payload.show

      state.XMessage.buttons = payload.buttons

      state.XMessage.answer = payload.answer

    },

    setXMessageAnswer: (state, { payload }) => {

      state.XMessage.answer = payload

    },

  }

})

export default itemSlice.reducer;

export const { setMiniMessage, setNormalMessage, setNormalMessageAnswer, setSmallMessage, setXMessage, setXMessageAnswer } = itemSlice.actions
