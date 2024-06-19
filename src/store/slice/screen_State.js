import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentScreen: null
}

const screenSlice = createSlice({
    name: 'screens',
    initialState,
    reducers: {
        setCurrentScreen(state, action) {
            state.currentScreen = action.payload
        }
    }
})

export const { setCurrentScreen } = screenSlice.actions
export const selectCurrentScreen = (state) => state.screens.currentScreen
export default screenSlice.reducer