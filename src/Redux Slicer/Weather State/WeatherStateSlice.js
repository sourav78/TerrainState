import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    coordinates: {
        lat: "",
        lon: ""
    },
    overView: {}
}

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        updateLocation: (state, action) => {
            state.coordinates.lat = action.payload.lat
            state.coordinates.lon = action.payload.lon
        },
        updateOverview: (state, action) => {
            state.overView = action.payload
        }
    }
})

export const { updateLocation, updateOverview } = weatherSlice.actions
export default weatherSlice.reducer