import { createSlice } from '@reduxjs/toolkit'


const displaySlice = createSlice({

  name: "item",

  initialState: {

    showNav: true,

    revealView: false,

  },

  reducers: {

    setShowNav: (state, { payload }) => {

      state.showNav = payload

    },

    setRevealView: (state, { payload }) => {

      state.revealView = payload

    },

  }

})

export default displaySlice.reducer;

export const { setShowNav, setRevealView } = displaySlice.actions
