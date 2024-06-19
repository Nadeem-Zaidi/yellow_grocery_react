import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { categoryApi } from "./api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import screenReducer from './slice/screen_State'


const rootReducer = combineReducers({
    // Add your API reducer
    [categoryApi.reducerPath]: categoryApi.reducer,
    // Add reducers for other screens/pages
    screen: screenReducer, // Assuming 'screenReducer' is your screen reducer
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(categoryApi.middleware),
});

setupListeners(store.dispatch);