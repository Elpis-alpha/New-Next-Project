import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";

import itemSlice from "./slice/itemSlice";

import messagesSlice from "./slice/messagesSlice";


const store = configureStore({

  reducer: {

    user: userSlice,

    item: itemSlice,

    messages: messagesSlice,

  }

});


export default store;