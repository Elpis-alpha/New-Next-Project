import { createSlice } from '@reduxjs/toolkit'


const itemSlice = createSlice({

  name: "item",

  initialState: {

    available: false,

    data: [],

  },

  reducers: {

    setItemData: (state, { payload }) => {

      state.data = payload

      state.available = true

    },

    appendItemData: (state, { payload }) => {

      state.data.push(payload)

    },

    removeItemData: (state) => {

      state.data = []

      state.available = false

    },

  }

})

export default itemSlice.reducer;

export const { setItemData, appendItemData, removeItemData } = itemSlice.actions
