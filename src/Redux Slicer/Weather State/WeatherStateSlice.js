import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    coordinates: {
        lat: "",
        lon: ""
    }
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        updateLocation: (state, action) => {
            state.coordinates.lat = action.payload.lat
            state.coordinates.lon = action.payload.lon
        }
    }
})

export const {updateLocation} = weatherSlice.actions
export default weatherSlice.reducer