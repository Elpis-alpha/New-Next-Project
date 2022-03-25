import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({

  name: "user",

  initialState: {

    available: false,

    data: {},

    tested: false,

  },

  reducers: {

    setUserData: (state, { payload }) => {

      state.data = payload

      state.tested = true

      state.available = true

    },

    setUserTest: (state, { payload }) => {

      state.tested = payload

    },

    removeUserData: (state) => {

      state.data = {}

      state.available = false

    },

  }

})

export default userSlice.reducer;

export const { setUserData, setUserTest, removeUserData } = userSlice.actions
