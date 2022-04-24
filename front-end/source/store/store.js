import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";

import itemSlice from "./slice/itemSlice";

import messagesSlice from "./slice/messagesSlice";

import displaySlice from "./slice/displaySlice";


const store = configureStore({

  reducer: {

    user: userSlice,

    item: itemSlice,

    messages: messagesSlice,

    display: displaySlice

  }

});


export default store;