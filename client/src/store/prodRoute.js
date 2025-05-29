import {createSlice} from "@reduxjs/toolkit"

const prodSlice = createSlice({
    name:"prod",
    initialState: {
        // link:"http://localhost:1000"
        link:"https://blog-admin-backend-kbem.onrender.com"
    }
})

export default prodSlice.reducer;