import {createSlice} from "@reduxjs/toolkit"

const prodSlice = createSlice({
    name:"prod",
    initialState: {
        link:"https://blog-admin-backend-kbem.onrender.com"
    }
})

export default prodSlice.reducer;
