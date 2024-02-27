import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { itemsReducers } from "./reducers/ItemsSlice";


const rootReducer = combineReducers({
    itemsSlice: itemsReducers,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                // .concat(postAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
